const FilterConstraintFunctions = {
  'is-string': (a: string, b: string) => a === b,
  '!is-string': (a: string, b: string) => a !== b,
  'contains-string': (a: string, b: string) => a.includes(b),
  '!contains-string': (a: string, b: string) => !a.includes(b),
  'starts-string': (a: string, b: string) => a.startsWith(b),
  '!starts-string': (a: string, b: string) => !a.startsWith(b),
  'ends-string': (a: string, b: string) => a.endsWith(b),
  '!ends-string': (a: string, b: string) => !a.endsWith(b),
  'empty-string': (a: string, _: string) => a === '',
  '!empty-string': (a: string, _: string) => a !== '',
} as const;

const filterConstraintsValue = [
  {
    constraint: 'is',
    translated: 'je',
    type: ['none'],
    check: 'is-string',
  },
  {
    constraint: 'is',
    translated: 'je',
    type: ['string'],
    check: 'is-string',
  },
  {
    constraint: '!is',
    translated: 'není',
    type: ['string'],
    check: '!is-string',
  },
  {
    constraint: 'contains',
    translated: 'obsahuje',
    type: ['string'],
    check: 'contains-string',
  },
  {
    constraint: '!contains',
    translated: 'neobsahuje',
    type: ['string'],
    check: '!contains-string',
  },
  {
    constraint: 'starts',
    translated: 'začíná',
    type: ['string'],
    check: 'starts-string',
  },
  {
    constraint: '!starts',
    translated: 'nezačíná',
    type: ['string'],
    check: '!starts-string',
  },
  {
    constraint: 'ends',
    translated: 'končí',
    type: ['string'],
    check: 'ends-string',
  },
  {
    constraint: '!ends',
    translated: 'nekončí',
    type: ['string'],
    check: '!ends-string',
  },
  {
    constraint: 'empty',
    translated: 'je prázdné',
    type: ['string'],
    check: 'empty-string',
  },
  {
    constraint: '!empty',
    translated: 'není prázdné',
    type: ['string'],
    check: '!empty-string',
  },
] as const;

const filterConstraints = filterConstraintsValue.filter((fc) => {
  return !(fc.type as unknown as string[]).includes('none');
});

declare global {
  type FilterConstraint = (typeof filterConstraints)[number]['constraint'];
  type FilterType = (typeof filterConstraints)[number]['type'][number];
}

export const useAppStore = defineStore('app', {
  state: () => ({
    ...appData(),
    isNavFixed: false,
    keys: new Map<string, string>([
      ['id', 'ID'],
      ['title', 'Název'],
      ['description', 'Popis'],
      ['dateUpload', 'Datum nahrání'],
      ['dateExpire', 'Datum expirace'],
      ['dateCreated', 'Datum vytvoření'],
      ['dateUpdated', 'Datum aktualizace'],
      ['notes', 'Poznámky'],
      ['state', 'Stav'],
      ['type', 'Typ'],
      ['name', 'Jméno'],
      ['extension', 'Přípona'],
      ['size', 'Velikost'],
      ['url', 'URL'],
    ]),
    sortDirs: new Map([
      ['asc', 'Vzestupně'],
      ['desc', 'Sestupně'],
    ]),
    filterConstraintsValue,
  }),
  getters: {
    // nav
    translateURL: (state) => (path: string) => {
      const { getPage } = usePageStore();
      return (
        findLinkByPath(path, state.nav)?.title ??
        getPage(useHyphenPath())?.title ??
        state.defaultValues.record.name
      );
    },
    firstNestedLink: (state) => {
      return (
        state.nav[0].links[0]?.groups?.[0].links[0] ?? {
          title: 'No Link',
          url: '/',
        }
      );
    },
    childGroups: (state) => (site: string) => {
      let parentIndex = 0;
      let childIndex = 0;
      parentIndex = state.nav.findIndex((item) => {
        childIndex = item.links.findIndex((link) => link.url.slice(1) === site);
        return childIndex !== -1;
      });
      return state.nav[parentIndex]?.links[childIndex]?.groups;
    },
    // actions
    getActionData: (state) => (name: ActionName) => {
      return state.actions.find((action) => action.name === name);
    },
    // headerButtonStates
    getHeaderButtonState:
      ({ headerButtons }) =>
      (name: string) => {
        const defaultState = {
          name: 'none',
          main: {
            action: {
              id: -1,
              name: 'none',
              text: 'none',
              shortcut: 'none',
              confirmation: false,
            },
          },
          options: {
            actions: [],
          },
        };

        return (
          headerButtons.states.find((state) => state.name === name) ??
          defaultState
        );
      },
    // notifications
    getNotificationByType: (state) => (type: string) => {
      const defaultState = {
        id: -1,
        type: 'none',
        message: 'none',
        icon: {
          url: 'none',
          alt: 'none',
        },
      };
      return (
        state.notifications.states.find((state) => state.type === type) ??
        defaultState
      );
    },
    // keys
    getTranslatedKey: (state) => (key: string) => {
      return state.keys.get(key) ?? key;
    },
    // filter
    filterConstraints: (state) => {
      return state.filterConstraintsValue.filter(
        (fc) => !(fc.type as unknown as string[]).includes('none'),
      );
    },
    getFilterConstraint: (state) => (filter: View['filters'][0]) => {
      const fc = state.filterConstraintsValue.find((fc) => {
        return (
          fc.constraint === filter.constraint &&
          (fc.type as unknown as string[]).includes(filter.type)
        );
      });
      return {
        constraint: fc?.constraint ?? 'is',
        translated: fc?.translated ?? 'je',
        type: fc?.type ?? ['string'],
        check: FilterConstraintFunctions[fc?.check ?? 'is-string'],
      };
    },
  },
  actions: {
    // ...
    setIsNavFixed(isFixed: boolean) {
      this.isNavFixed = isFixed;
    },
  },
});
