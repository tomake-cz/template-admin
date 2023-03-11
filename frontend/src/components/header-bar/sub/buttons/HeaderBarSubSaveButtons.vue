<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { first, second } = toRefs(storeToRefs(useAppDataStore()).save.value);

const isVisible = ref(false);
</script>

<template>
  <div class="relative flex gap-2 text-sm text-gray-lighter">
    <AppButtonUpload class="rounded-full bg-site-2 px-4 py-2 hover:bg-site-1">
      {{ first }}
    </AppButtonUpload>
    <button
      class="rounded-full bg-site-2 px-3 py-2 hover:bg-site-1"
      @click="isVisible = !isVisible"
    >
      <img
        :src="useAsset(second.icon.url)"
        :alt="second.icon.alt"
        class="h-4 w-4"
      />
    </button>
    <HeaderBarSubButtonsPopUp
      :is-visible="isVisible"
      :actions="second.actions"
      @close="isVisible = false"
    />
  </div>
</template>
