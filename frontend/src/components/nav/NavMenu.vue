<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { nav } = storeToRefs(useAppDataStore());
</script>

<template>
  <div class="flex w-[240px] flex-col items-center bg-black-light p-6">
    <NavLogo class="mb-6" />
    <div>
      <SearchBar class="mb-6" />
      <template v-for="group in nav" :key="group.id + group.title">
        <NavGroup :group="group" />
      </template>
    </div>
  </div>
</template>
