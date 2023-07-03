import { defaultViewPair } from '@/stores/ViewStore';

type TRPC = ReturnType<typeof useTRPC>['multi']['getOne']['useQuery'];
type Refresh = ReturnType<Awaited<TRPC>>['refresh'];

type PageName = string;
type Page = {
  name: string;
  model: string;
  id: number;
  type: 'record' | 'structure' | 'unknown';
  title?: string;
  loading: boolean;
  views: Map<string, View>;
  storedViews: Map<string, View>;
  keys: Map<string, Key>;
  inputs: {
    info?: MapOfInputs;
    cached: MapOfInputs;
    stored: MapOfInputs;
  };
  upload: Upload | null;
  refresh: Refresh | null;
};

export const usePageStore = defineStore('page', () => {
  const pages = ref(new Map<PageName, Page>());
  const hasPage = (name?: string) => pages.value.has(name ?? useHyphenPath());
  const getPage = (name?: string) => pages.value.get(name ?? useHyphenPath());
  const setPageValues = (p: Partial<Omit<Page, 'name'>>) => {
    if (hasPage()) {
      const page = getPage();
      if (page) {
        Object.assign(page, p);
      }
      return;
    }

    const name = useHyphenPath();
    pages.value.set(name, {
      name,
      model: p.model ?? '',
      id: p.id ?? -1,
      type: p.type ?? 'unknown',
      loading: p.loading ?? false,
      views: new Map([defaultViewPair, ...(p.views ?? [])]),
      storedViews: new Map([defaultViewPair, ...(p.storedViews ?? [])]),
      keys: new Map(p.keys),
      inputs: {
        info: new InputMap(),
        cached: new InputMap(),
        stored: new InputMap(),
      },
      upload: p.upload ?? null,
      refresh: p.refresh ?? null,
    });
  };
  const remove = (name?: string) => {
    pages.value.delete(name ?? useHyphenPath());
  };

  return {
    pages,
    hasPage,
    getPage,
    setPageValues,
    remove,
  };
});
