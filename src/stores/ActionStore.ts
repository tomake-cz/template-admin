/* eslint-disable no-console */
import { defaultView } from '@/stores/ViewStore';

declare global {
  type ActionName = string;
  type Action = () => void;
}

export const useActionStore = defineStore('action', () => {
  const actions = ref(new Map<ActionName, Action>());

  const { actions: storeActions, messages } = storeToRefs(useAppStore());

  storeActions.value.forEach((state) =>
    actions.value.set(state.name, () => {
      console.log(`Action ${state.name} not implemented`);
    }),
  );

  const fallback = () => {
    console.log('fallback action');
  };

  const run = (key: ActionName) => {
    get(key)();
  };

  const delay = 500;
  let deferCount = 0;
  let isDeferActive = false;
  const defer = async (key: ActionName) => {
    while (deferCount > 0) {
      deferCount--;
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (deferCount === 0) {
        run(key);
        isDeferActive = false;
      }
    }
  };
  const runDeferred = (key: ActionName) => {
    deferCount++;

    if (isDeferActive) {
      return;
    }

    isDeferActive = true;
    defer(key);
  };

  const get = (key: ActionName) => {
    return actions.value.get(key) ?? fallback;
  };

  const set = (name: ActionName, action: Action) => {
    const storeActionName = storeActions.value.find(
      (state) => state.name === name,
    );

    if (!storeActionName) {
      throw new Error(`Action ${name} not found`);
    }

    actions.value.set(name, () => {
      const currAction = storeActions.value.find(
        (state) => state.name === name,
      );
      if (currAction?.confirmation) {
        const confirmation = confirm(messages.value.delete);
        if (!confirmation) {
          return;
        }
      }

      action();
    });
  };

  const upload = () => {
    const { messages } = storeToRefs(useAppStore());
    const { changedInputs } = storeToRefs(useInputStore());

    if (changedInputs.value.size === 0) {
      useNotificationStore().add('info', messages.value.noChanges);
      return;
    }

    useUploadStore().run();
  };
  set('saveAndLeave', () => {
    upload();
  });
  set('saveAndContinue', () => {
    upload();
  });
  set('delete', () => {
    const { messages } = storeToRefs(useAppStore());
    const { changedInputs } = storeToRefs(useInputStore());
    const { add: useAddNotification } = useNotificationStore();

    if (changedInputs.value.size === 0) {
      useAddNotification('info', messages.value.noChanges);
      return;
    }

    const { resetCache } = useInputStore();
    resetCache();

    const { getStoredInputs } = useInputStore();
    const inputs = useCurrentPageChangedInputs();
    inputs.forEach((input) => {
      input.value = (
        getStoredInputs().get(useStripIdPrefix(input.id)) ?? input.value
      ).toString();
    });

    useAddNotification('success', messages.value.successfullyDeletedChanges);
  });
  set('create', () => {
    const router = useRouter();
    const path = useRoute().path;
    const { create } = toRefs(storeToRefs(useAppStore()).dynamicNav.value);

    router.push({
      path: `${path}/${create.value.url}`,
    });
  });
  set('deleteStructure', () => {
    const { messages } = storeToRefs(useAppStore());
    const { add: useAddNotification } = useNotificationStore();

    const res = confirm(messages.value.deleteStructurePrompt);
    if (!res) {
      useAddNotification('info', messages.value.noActionHappened);
      return;
    }

    try {
      const mutation = useMutationStore().get('delete');

      if (!mutation) {
        useAddNotification('error', messages.value.generic);
        return;
      }

      const ids = useSelectedStructureRecords().map(({ name }) => Number(name));
      if (ids.length === 0) {
        useAddNotification('info', messages.value.nothingSelected);
        return;
      }

      const promise = mutation(ids);

      promise
        .then(() => {
          useAddNotification('success', messages.value.deleteStructureSuccess);
          usePageStore().getPage()?.refresh?.();
        })
        .catch(() => {
          useAddNotification('error', messages.value.deleteStructureError);
        });
    } catch (e) {
      useAddNotification('error', messages.value.deleteStructureError);
    }
  });
  const toggleStructureState = (state: boolean) => {
    const { messages } = storeToRefs(useAppStore());
    const { add: useAddNotification } = useNotificationStore();

    const mutation = useMutationStore().get('toggle');
    if (!mutation) {
      useAddNotification('error', messages.value.generic);
      return;
    }

    const ids = useSelectedStructureRecords().map(({ name }) => Number(name));
    if (ids.length === 0) {
      useAddNotification('info', messages.value.nothingSelected);
      return;
    }

    const promise = mutation(ids, state);

    promise
      .then(() => {
        useAddNotification(
          'success',
          messages.value.toggleStructureStateSuccess,
        );
        usePageStore().getPage()?.refresh?.();
      })
      .catch((e) => {
        console.log(e);
        useAddNotification('error', messages.value.toggleStructureStateError);
      });
  };
  set('toggleStructureStateOn', () => {
    toggleStructureState(true);
  });
  set('toggleStructureStateOff', () => {
    toggleStructureState(false);
  });

  // views
  set('createView', () => {
    const { messages } = storeToRefs(useAppStore());
    const { add: useAddNotification } = useNotificationStore();

    const res = prompt(messages.value.createViewPrompt, '');
    if (!res) {
      useAddNotification('info', messages.value.noActionHappened);
      return;
    }
    if (res === defaultView.name) {
      useAddNotification('info', messages.value.viewNameAlreadyExists);
      return;
    }

    const { view } = storeToRefs(useViewStore());
    const keys = [...(view.value.keys.values() ?? [])];

    const { getPage } = usePageStore();
    const modelName = getPage()?.model ?? '';
    getPage()?.views.set(res, {
      ...defaultView,
      isEditable: true,
      name: res,
      modelName,
      keys: new Map(keys.map((k) => [k.name, k])),
    });
    useViewStore().activateView(res);

    const promise = useTRPC().view.createView.mutate({
      name: res,
      modelName,
      keys,
    });

    promise
      .then((data) => {
        const dbView = useParseViewDb(data);
        getPage()?.views.set(dbView.name, {
          ...view.value,
          id: dbView.id,
        });
        useViewStore().activateView(res);
        useAddNotification('success', messages.value.createViewSuccess);
      })
      .catch((e) => {
        useAddNotification('error', messages.value.genericShort);
        console.log(e);
      });
  });
  set('renameView', () => {
    const { messages } = storeToRefs(useAppStore());
    const { clickedView } = storeToRefs(useViewStore());
    const { add: useAddNotification } = useNotificationStore();

    if (!clickedView.value.isEditable) {
      useAddNotification('info', messages.value.defaultViewNotEditable);
      return;
    }

    const res = prompt(messages.value.renameViewPrompt, clickedView.value.name);
    if (!res) {
      useAddNotification('info', messages.value.noActionHappened);
      return;
    }
    if (res === clickedView.value.name) {
      useAddNotification('info', messages.value.renameViewNameNotChanged);
      return;
    }

    const { getPage } = usePageStore();
    const { isActiveView, activateView } = useViewStore();
    const page = getPage();
    const wasActive = isActiveView(clickedView.value.name);
    page?.views.set(res, { ...clickedView.value, name: res });
    page?.views.delete(clickedView.value.name);
    if (wasActive) {
      activateView(res);
    }

    const promise = useTRPC().view.updateView.mutate({
      id: clickedView.value.id,
      name: res,
    });

    promise
      .then(() => {
        useAddNotification('success', messages.value.renameViewSuccess);
      })
      .catch(() => {
        useAddNotification('error', messages.value.renameViewError);
      });
  });
  set('deleteView', () => {
    const { messages } = storeToRefs(useAppStore());
    const { clickedView } = storeToRefs(useViewStore());
    const { add: useAddNotification } = useNotificationStore();

    if (!clickedView.value.isEditable) {
      useAddNotification('info', messages.value.defaultViewNotEditable);
      return;
    }

    const res = confirm(messages.value.deleteViewPrompt);
    if (!res) {
      useAddNotification('info', messages.value.noActionHappened);
      return;
    }

    usePageStore().getPage()?.views.delete(clickedView.value.name);
    useViewStore().activateView(defaultView.name);

    const promise = useTRPC().view.deleteView.mutate(clickedView.value.id);

    promise
      .then(() => {
        useAddNotification('success', messages.value.deleteViewSuccess);
      })
      .catch(() => {
        useAddNotification('error', messages.value.genericShort);
      });
  });
  set('updateViews', () => {
    const { messages } = storeToRefs(useAppStore());
    const { getChangedViews } = useViewStore();
    const views = getChangedViews();

    if (views.size === 0) {
      console.log('updateView action -> no views');
      return;
    }

    const viewsArray = [...views.values()];
    const promise = useTRPC().view.updateViews.mutate(
      viewsArray.map((view) => ({
        id: view.get('id') as number,
        name: view.get('name') as string,
        // modelName: view.get('modelName'),
        sortName: view.get('sortName') as string,
        sortDir: view.get('sortDir') as string,
        filters: (view.get('filters') as View['filters'])?.map((filter) => ({
          id: filter.id,
          viewId: filter.viewId,
          key: filter.key,
          type: filter.type,
          constraint: filter.constraint,
          value: filter.value,
        })),
        keys: [...((view.get('keys') as View['keys'])?.values() ?? [])].map(
          (key) => ({
            name: key.name,
            type: key.type,
            enabled: key.enabled,
          }),
        ),
      })),
    );

    promise
      .then((res) => {
        console.log('updateViews action -> done', res);
      })
      .catch((e) => {
        console.log(e);
        useNotificationStore().add('error', messages.value.genericShort);
      });
  });
  set('deleteFilters', () => {
    const { deletedFilters } = storeToRefs(useViewStore());

    const promise = useTRPC().view.deleteFilters.mutate(
      deletedFilters.value.map((f) => ({ id: f.id, viewId: f.viewId })),
    );

    promise
      .then((res) => {
        console.log('deleteFilters action -> done', res);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return {
    run,
    runDeferred,
    get,
    set,
  };
});
