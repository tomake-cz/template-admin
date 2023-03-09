<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { notes } = toRefs(storeToRefs(useAppDataStore()).controlPanel.value);
</script>

<template>
  <textarea
    :placeholder="notes"
    class="min-h-[90px] w-full rounded-[12px] border-[1px] border-solid border-gray-dark p-2 text-xs font-normal text-black-light"
  />
</template>
