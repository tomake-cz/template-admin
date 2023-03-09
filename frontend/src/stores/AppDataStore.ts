import { defineStore } from 'pinia';
import data from '@/assets/data.json';

export const useAppDataStore = defineStore('appData', {
  state: () => ({
    ...data,
  }),
  getters: {
    // ...
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
