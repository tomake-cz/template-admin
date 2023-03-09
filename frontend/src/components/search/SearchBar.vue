<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { search } = storeToRefs(useAppDataStore());
const { text, icon } = toRefs(search.value);
</script>

<template>
  <div class="relative h-12 w-full">
    <img
      :src="useAsset(icon.url)"
      :alt="icon.alt"
      class="icon-gray-dark pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
    />
    <input
      type="text"
      :placeholder="text"
      class="h-full w-full rounded-full bg-gray-light p-4 pl-11 text-xs text-gray-dark"
    />
  </div>
</template>
