<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { translateURL } = storeToRefs(useAppDataStore());

const route = useRoute();
const title = ref(translateURL.value(route.path));
</script>

<template>
  <div class="flex h-full justify-between">
    <AppNav />
    <div class="grow py-12 px-6">
      <div class="mb-12">
        <h1 class="text-3xl">{{ title }}</h1>
        <AppRevisionHistory />
      </div>
      <div :id="useHyphenPath()" class="flex flex-col gap-6">
        <slot />
      </div>
    </div>
    <AppControlPanel />
  </div>
</template>
