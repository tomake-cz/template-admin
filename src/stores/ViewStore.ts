import jsonData from '@/assets/data.json';

const jsonView = jsonData.defaultValues.view;
export const defaultView: View = {
  id: jsonView.id,
  isEditable: false,
  name: jsonView.name,
  modelName: jsonView.modelName,
  sortName: jsonView.sortName,
  sortDir: jsonView.sortDir as SortDir,
  filters: jsonView.filters,
  keys: new Map(jsonView.keys),
};
export const defaultViewFetch: ViewFetch[0] = {
  ...defaultView,
  keys: jsonView.keys,
};
export const defaultViewPair = [defaultView.name, defaultView] as const;

export const useViewStore = defineStore('view', () => {
  /** Current selected view that the user sees */
  const view = ref<View>(defaultView);
  const setView = ({
    id,
    name,
    modelName,
    sortName,
    sortDir,
    keys,
  }: Partial<Omit<View, 'filters'>>) => {
    if (!view.value.isEditable) {
      useNotificationStore().add(
        'info',
        useAppStore().messages.defaultViewNotEditable,
      );
      return;
    }

    view.value.id = id ?? view.value.id;
    view.value.name = name ?? view.value.name;
    view.value.modelName = modelName ?? view.value.modelName;
    view.value.sortName = sortName ?? view.value.sortName;
    view.value.sortDir = sortDir ?? view.value.sortDir;
    view.value.keys = keys ? new Map(keys) : view.value.keys;

    useActionStore().runDeferred('updateViews');
  };
  const isActiveView = (name: string) => {
    return view.value.name === name;
  };
  const activateView = (name: string) => {
    const pageView = usePageStore().getPage()?.views.get(name);
    if (!pageView) return;

    view.value = pageView;
  };

  const getEnabledViewKeys = () => {
    return [...view.value.keys.values()].filter((k) => k.enabled);
  };
  const getViewKey = (key: string) => {
    return view.value.keys.get(key);
  };
  const getSortKeyType = (key: string) => {
    return usePageStore().getPage()?.keys.get(key);
  };
  const setKey = (name: string, enabled: boolean) => {
    if (!view.value.keys.has(name)) return;

    const keys = view.value.keys;
    keys.set(name, {
      ...keys.get(name),
      enabled,
    } as Key);

    useActionStore().runDeferred('updateViews');
  };
  const setKeysOnAllPageViews = () => {
    const { getPage } = usePageStore();

    const keys = getPage()?.keys;
    if (!keys) return;

    getPage()?.views.forEach((view) => {
      if (view.keys.size === 0) {
        view.keys = new Map(keys);
        return;
      }

      view.keys.forEach((key) => {
        if (keys.has(key.name)) return;

        keys.set(key.name, key);
      });
      view.keys = sortKeys(view.keys);
    });
  };

  const sortAlgo = (a: string, b: string) => {
    if (a === 'title') return -1;
    if (b === 'title') return 1;
    return a.localeCompare(b);
  };
  const sortKeys = <T>(keys: Map<string, T>) => {
    return new Map([...keys].sort(([a], [b]) => sortAlgo(a, b)));
  };
  const sortValues = <T>(obj: Record<string, T>) => {
    return Object.fromEntries(
      Object.entries(obj).sort(([a], [b]) => sortAlgo(a, b)),
    );
  };

  const constructFilterId = (
    filter: Omit<View['filters'][0], 'id' | 'viewId'>,
  ) => {
    return filter.key + filter.constraint + filter.value;
  };
  const addViewFilter = (filter: Omit<View['filters'][0], 'id' | 'viewId'>) => {
    if (!view.value.isEditable) {
      useNotificationStore().add(
        'info',
        useAppStore().messages.defaultViewNotEditable,
      );
      return;
    }

    const id = constructFilterId(filter);

    if (view.value.filters.some((f) => f.id === id)) {
      const { onlyUniqueFilters } = toRefs(useAppStore().messages);
      useNotificationStore().add('info', onlyUniqueFilters.value);
      return;
    }

    const viewId = view.value.id;
    view.value.filters = view.value.filters.concat([{ ...filter, id, viewId }]);
  };
  const upsertViewFilter = (filter: Omit<View['filters'][0], 'viewId'>) => {
    const existing = view.value.filters.find((f) => f.id === filter.id);

    const { runDeferred } = useActionStore();

    if (existing) {
      existing.id = constructFilterId(filter);
      existing.key = filter.key;
      existing.constraint = filter.constraint;
      existing.value = filter.value;
      if (existing.type === 'none') existing.type = filter.type;

      runDeferred('updateViews');
      return;
    }

    runDeferred('updateViews');

    addViewFilter(filter);
  };

  const deletedFilters = ref<View['filters']>([]);
  const removeViewFilter = (id: string) => {
    const index = view.value.filters.findIndex((f) => f.id === id);
    const deletedFilter = view.value.filters.splice(index, 1);

    deletedFilters.value.push(...deletedFilter);
    useActionStore().runDeferred('deleteFilters');
  };

  const setViews = (views: ViewFetch) => {
    const page = usePageStore().getPage();
    if (!page) return;

    const getView = (v: ViewFetch[0]) => {
      const view = [
        v.name,
        {
          ...v,
          keys: new Map(v.keys.map((k) => [k.name, k])),
        },
      ] as [string, View];
      view[1].keys = sortKeys(view[1].keys);
      return view;
    };
    const getViewsMap = (views: ViewFetch) => {
      const viewArray = views.map((v) => getView(v));

      viewArray.splice(0, 0, [
        defaultViewFetch.name,
        getView({ ...defaultViewFetch, keys: views[0]?.keys ?? [] })?.[1],
      ]);
      return new Map([...viewArray] as [string, View][]);
    };

    page.views = getViewsMap(views);
    page.storedViews = getViewsMap(views);
  };

  const getChangedViews = () => {
    const page = usePageStore().getPage();
    if (!page) return new Map<string, Map<string, View[ViewKey]>>();

    const changed = new Map<string, Map<string, View[ViewKey]>>();

    page.storedViews.forEach((storedView) => {
      const view = page.views.get(storedView.name);
      if (!view) {
        changed.set(storedView.name, new Map(Object.entries(storedView)));
        return;
      }

      const changedView = new Map<string, View[ViewKey]>([
        ['id', view.id],
        ['keys', new Map<string, Key>()],
      ]);
      const changedViewKeys = changedView.get('keys') as View['keys'];

      Object.entries(storedView).forEach(([storedViewKey, storedViewValue]) => {
        const isStoredKeyDifferent =
          storedViewValue !== view[storedViewKey as ViewKey];
        if (storedViewKey !== 'keys' && isStoredKeyDifferent) {
          changedView.set(storedViewKey, view[storedViewKey as ViewKey]);
          return;
        }
        if (storedViewKey !== 'keys') return;

        const storedViewKeys = storedViewValue as Map<string, Key>;
        storedViewKeys.forEach((storedViewKey, storedViewKeyName) => {
          if (!view.keys.has(storedViewKeyName)) {
            changedViewKeys.set(storedViewKeyName, storedViewKey);
          }

          Object.entries(storedViewKey).forEach(([name, value]) => {
            const viewKey = view.keys.get(storedViewKeyName);

            const isStoredViewKeyValueDifferent =
              value !== viewKey?.[name as keyof Key];
            if (isStoredViewKeyValueDifferent) {
              changedViewKeys.set(storedViewKeyName, viewKey ?? storedViewKey);
            }
          });
        });
      });

      if (changedViewKeys.size === 0) {
        changedView.delete('keys');
      }
      if (changedView.size > 1) {
        changed.set(storedView.name, changedView);
      }
    });

    return changed;
  };

  /** View that the user right clicked on */
  const clickedView = ref<View>({
    id: -1,
    isEditable: true,
    name: '',
    modelName: '',
    sortName: '',
    sortDir: 'asc',
    filters: [],
    keys: new Map(),
  });
  const activateClickedView = (name: string) => {
    const pageView = usePageStore().getPage()?.views.get(name);
    if (!pageView) return;

    clickedView.value = pageView;
  };

  return {
    isActiveView,
    setViews,
    getChangedViews,
    view,
    setView,
    addViewFilter,
    upsertViewFilter,
    deletedFilters,
    removeViewFilter,
    activateView,
    getEnabledViewKeys,
    getViewKey,
    clickedView,
    activateClickedView,
    getSortKeyType,
    setKey,
    setKeysOnAllPageViews,
    sortValues,
  };
});
