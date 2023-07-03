<script setup lang="ts">
const { search } = storeToRefs(useAppStore());
const { text, icon } = toRefs(search.value);
</script>

<template>
  <div class="relative h-12 w-full">
    <AppIcon
      :icon="icon"
      size="lg"
      class="icon-gray-dark pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
    />
    <input
      type="text"
      :placeholder="text"
      class="h-full w-full rounded-full bg-gray-light p-4 pl-11 text-xs text-gray-dark"
    />
  </div>
</template>
