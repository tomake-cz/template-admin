<script setup lang="ts">
defineProps<{
  data?: AppRecord | null;
  controls?: ControlPanelControls;
}>();

const { isNavFixed } = storeToRefs(useAppStore());
</script>

<template>
  <div class="relative h-full w-64">
    <div
      :class="[isNavFixed ? 'fixed top-12' : 'absolute']"
      class="w-[inherit] rounded-bl-[60px] bg-gray-light p-6"
    >
      <ControlPanelControls :data="data" :controls="controls" class="mb-6" />
      <ControlPanelNotes :notes="data?.notes" />
    </div>
  </div>
</template>
