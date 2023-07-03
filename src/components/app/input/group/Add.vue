<script setup lang="ts">
const { newObjectIcon } = toRefs(useAppStore().inputs.group);
</script>

<template>
  <div
    class="flex w-full cursor-pointer select-none items-center justify-center rounded-[12px] border-[3px] border-dashed border-gray-dark py-2"
  >
    <AppIcon :icon="newObjectIcon" size="md" class="icon-site-2 -rotate-45" />
  </div>
</template>
