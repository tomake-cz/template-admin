<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { dateUpload, dateExpire, state, created, updated } = toRefs(
  storeToRefs(useAppDataStore()).controlPanel.value.controls,
);
</script>

<template>
  <div class="flex flex-col gap-4 rounded-xl bg-gray-dark p-6">
    <AppInputDate id="dateUpload" :label="dateUpload" is-smaller />
    <AppInputDate id="dateExpire" :label="dateExpire" is-smaller />
    <AppInputToggle
      id="state"
      :label="state.label"
      :text="state.text"
      is-smaller
    />
    <AppControlPanelControlsInfo :label="created" />
    <AppControlPanelControlsInfo :label="updated" />
  </div>
</template>
