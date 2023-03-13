import jsonData from '@/assets/data.json';

type JSONData = typeof jsonData;

type Action = (typeof jsonData.actions)[0];
type JSONHeaderButtonStates = (typeof jsonData.headerButtonStates)[0];
type HeaderButtonStates = (Omit<JSONHeaderButtonStates, 'first' | 'second'> & {
  first: Omit<JSONHeaderButtonStates['first'], 'action'> & {
    action: Action;
  };
  second: Omit<JSONHeaderButtonStates['second'], 'actions'> & {
    actions: Action[];
  };
})[];

type ModifiedData = Omit<JSONData, 'headerButtonStates'> & {
  headerButtonStates: HeaderButtonStates;
};

type Nav = typeof jsonData.nav;
const createLinks = (navP: Nav) => {
  const nav: Nav = JSON.parse(JSON.stringify(navP));
  nav.forEach((navGroup) => {
    navGroup.links.forEach((navLink) => {
      navLink.groups?.forEach((navLinkGroup) => {
        navLinkGroup.url = navLink.url + navLinkGroup.url;
        navLinkGroup.links?.forEach((navLinkGroupLink) => {
          navLinkGroupLink.url = navLinkGroup.url + navLinkGroupLink.url;
        });
      });
    });
  });
  return nav;
};

const insertActionsIntoHeaderButtons = (jsonData: JSONData) => {
  const data: JSONData = JSON.parse(JSON.stringify(jsonData));

  const buttons = data.headerButtonStates.map(({ name, first, second }) => {
    const modFirst = {
      ...first,
      action: data.actions.find(
        (action) => action.name === first.action,
      ) as Action,
    };
    const modSecond = {
      ...second,
      actions: second.actions.map(
        (actionName) =>
          data.actions.find((action) => actionName === action.name) as Action,
      ),
    };
    return { name, first: modFirst, second: modSecond };
  });

  return {
    ...data,
    headerButtonStates: buttons,
  };
};

jsonData.nav = createLinks(jsonData.nav);
const data = insertActionsIntoHeaderButtons(jsonData);

export const appData = (): ModifiedData => data;

// store functions
export const findLinkByPath = (path: string, nav: Nav) => {
  for (const group of nav) {
    for (const link of group.links) {
      if (link.url === path) return link;
      for (const group of link.groups || []) {
        if (group.url === path) return group;
        for (const link of group.links || []) {
          if (link.url === path) return link;
        }
      }
    }
  }

  return {
    title: 'Not Found',
    url: '/404',
  };
};
