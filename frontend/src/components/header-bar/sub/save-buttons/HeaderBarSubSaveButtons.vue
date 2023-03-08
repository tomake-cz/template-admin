<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { first, second } = toRefs(storeToRefs(useAppDataStore()).save.value);
</script>

<template>
  <div class="relative flex gap-2 text-sm text-gray-lighter">
    <button class="rounded-full bg-gray-darker px-4 py-2">
      {{ first }}
    </button>
    <button class="rounded-full bg-gray-darker px-3 py-2">
      <img
        :src="useAsset(second.icon.url)"
        :alt="second.icon.alt"
        class="h-4 w-4"
      />
    </button>
    <HeaderBarSubSaveButtonsPopUp :actions="second.actions" />
  </div>
</template>
