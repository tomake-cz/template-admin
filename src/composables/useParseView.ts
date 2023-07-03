type View = AppRouterOutputs['view']['createView'];
export const useParseViewDb = (view: View) => {
  return {
    ...view,
    sortDir: view.sortDir as SortDir,
    filters: view.filters.map((f) => ({
      ...f,
      type: f.type as FilterType,
      constraint: f.constraint as FilterConstraint,
    })),
    keys: new Map(
      view.keys.map((k) => [
        k.name,
        {
          ...k,
          translated: useAppStore().getTranslatedKey(k.name),
        },
      ]),
    ),
  };
};
