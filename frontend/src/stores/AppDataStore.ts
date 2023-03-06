import { defineStore } from 'pinia';
import data from '@/assets/data.json';

export const useAppDataStore = defineStore('appData', {
  state: () => ({
    ...data,
  }),
  getters: {
    // ...
  },
  actions: {
    // ...
  },
});
