/* eslint-disable no-console */
type PageName = string;

type Mutations = {
  delete: (ids: number[]) => Promise<unknown>;
  toggle: (ids: number[], state: boolean) => Promise<unknown>;
};

export const useMutationStore = defineStore('mutation', () => {
  const mutations = reactive({
    delete: new Map<PageName, Mutations['delete']>(),
    toggle: new Map<PageName, Mutations['toggle']>(),
  });
  type Type = keyof typeof mutations;

  const fallback = () => {
    console.log('fallback mut');
  };

  const get = <T extends Type>(type: T, name?: string) => {
    const newName = name ?? getPage()?.name;

    if (!newName) {
      throw new Error('Mutation has no name in getter');
    }

    return (
      (mutations[type] as Map<PageName, Mutations[T]>).get(newName) ??
      fallback()
    );
  };

  const { getPage } = usePageStore();
  const set = <T extends Type>(type: T, mut: Mutations[T], name?: string) => {
    const newName = name ?? getPage()?.name;

    if (!newName) {
      throw new Error('Mutation has no name in setter');
    }

    (mutations[type] as Map<PageName, Mutations[T]>).set(newName, mut);
  };

  return {
    get,
    set,
  };
});
