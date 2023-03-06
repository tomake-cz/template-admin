<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { search } = storeToRefs(useAppDataStore());
const { text } = toRefs(search.value);
</script>

<template>
  <input
    type="text"
    :placeholder="text"
    class="h-12 w-full rounded-3xl bg-gray-light p-4 text-gray-dark"
  />
</template>
