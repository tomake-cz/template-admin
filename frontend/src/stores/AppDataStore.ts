import { defineStore } from 'pinia';
import { appData, findLinkByPath } from './../util/store';

export const useAppDataStore = defineStore('appData', {
  state: () => ({
    ...appData(),
  }),
  getters: {
    // ...
    translateURL: (state) => (path: string) => {
      return findLinkByPath(path, state.nav)?.title;
    },
    // AppNav
    childGroups: (state) => (site: string) => {
      let parentIndex = 0;
      let childIndex = 0;
      parentIndex = state.nav.findIndex((item) => {
        childIndex = item.links.findIndex((link) => link.url.slice(1) === site);
        return childIndex !== -1;
      });
      return state.nav[parentIndex]?.links[childIndex]?.groups;
    },
  },
  actions: {
    // ...
  },
});
