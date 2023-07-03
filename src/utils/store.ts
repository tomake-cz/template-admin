import jsonData from '@/assets/app.json';
import clientJsonData from '@/assets/client.json';

type JSONData = typeof jsonData;
type ClientJSONData = typeof clientJsonData;

type Action = (typeof jsonData.actions)[0];
type JSONHeaderButtonStates = (typeof jsonData.headerButtons.states)[0];
type HeaderButtonStates = (Omit<JSONHeaderButtonStates, 'main' | 'options'> & {
  main: Omit<JSONHeaderButtonStates['main'], 'action'> & {
    action: Action;
  };
  options: Omit<JSONHeaderButtonStates['options'], 'actions'> & {
    actions: Action[];
  };
})[];

type JSONViewsTabs = typeof jsonData.views.tabs;
type ViewsTabs = Omit<JSONViewsTabs, 'contextMenu'> & {
  contextMenu: Action[];
};

type JSONViewsOptions = typeof jsonData.views.options;
type ViewsOptions = Omit<JSONViewsOptions, 'settings' | 'state'> & {
  settings: Omit<JSONViewsOptions['settings'], 'actions'> & {
    actions: Action[];
  };
  state: Omit<JSONViewsOptions['state'], 'actions'> & {
    actions: Action[];
  };
};

type ModifiedData = ClientJSONData &
  Omit<JSONData, 'headerButtons' | 'views'> & {
    headerButtons: Omit<JSONData['headerButtons'], 'states'> & {
      states: HeaderButtonStates;
    };
    views: Omit<JSONData['views'], 'tabs' | 'options'> & {
      tabs: ViewsTabs;
      options: ViewsOptions;
    };
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

const transformHeaderButtons = (jsonData: JSONData) => {
  const data: JSONData = JSON.parse(JSON.stringify(jsonData));

  const buttons = data.headerButtons.states.map(({ name, main, options }) => {
    const modMain = {
      ...main,
      action: data.actions.find(
        (action) => action.name === main.action,
      ) as Action,
    };
    const modOptions = {
      ...options,
      actions: options.actions.map(
        (actionName) =>
          data.actions.find((action) => actionName === action.name) as Action,
      ),
    };
    return { name, main: modMain, options: modOptions };
  });

  return {
    ...data.headerButtons,
    states: buttons,
  };
};

const transformViews = (jsonData: JSONData) => {
  const data: JSONData = JSON.parse(JSON.stringify(jsonData));
  const contextMenu = data.views.tabs.contextMenu.map(
    (actionName) =>
      data.actions.find((action) => actionName === action.name) as Action,
  );

  const optionsSettingsActions = data.views.options.settings.actions.map(
    (actionName) =>
      data.actions.find((action) => actionName === action.name) as Action,
  );
  const optionsStateActions = data.views.options.state.actions.map(
    (actionName) =>
      data.actions.find((action) => actionName === action.name) as Action,
  );

  return {
    ...data.views,
    tabs: {
      ...data.views.tabs,
      contextMenu,
    },
    options: {
      ...data.views.options,
      settings: {
        ...data.views.options.settings,
        actions: optionsSettingsActions,
      },
      state: {
        ...data.views.options.state,
        actions: optionsStateActions,
      },
    },
  };
};

jsonData.nav = createLinks(jsonData.nav);

const data = {
  ...clientJsonData,
  ...jsonData,
  headerButtons: transformHeaderButtons(jsonData),
  views: transformViews(jsonData),
};

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

  return null;
};
