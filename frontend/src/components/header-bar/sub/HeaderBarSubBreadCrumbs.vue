<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { translateURL } = storeToRefs(useAppDataStore());

const SEPARATOR = '/';

const route = useRoute();
const sites = ref(route.path.split('/').slice(1));
const mainSite = ref(sites.value[0]);

watch(route, () => {
  sites.value = route.path.split('/').slice(1);
  mainSite.value = sites.value[0];
});

const getSitePath = (site: string) => {
  const index = sites.value.indexOf(site);
  return '/' + sites.value.slice(0, index + 1).join('/');
};
</script>

<template>
  <div class="text-xs text-gray-lighter">
    <NuxtLink :to="'/' + mainSite" class="text-black-light">
      {{ translateURL('/' + mainSite) }}
    </NuxtLink>
    <template v-for="(site, i) in sites.slice(1)" :key="site + i">
      <span class="mx-2">{{ SEPARATOR }}</span>
      <NuxtLink :to="getSitePath(site)">
        {{ translateURL(getSitePath(site)) }}
      </NuxtLink>
    </template>
  </div>
</template>
