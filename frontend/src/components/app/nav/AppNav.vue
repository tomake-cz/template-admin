<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { childGroups: groups } = storeToRefs(useAppDataStore());
const route = useRoute();
const site = route.path.split('/')[1];
</script>

<template>
  <nav class="h-full w-60 bg-gray-dark px-6 py-12">
    <template v-for="group in groups(site)" :key="group.id + group.title">
      <AppNavGroup :group="group" />
    </template>
  </nav>
</template>
