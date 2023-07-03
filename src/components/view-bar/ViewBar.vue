<script setup lang="ts">
const showBottom = computed(() => {
  const { view } = storeToRefs(useViewStore());
  return view.value.filters.length > 0 || view.value.sortName !== 'none';
});
</script>

<template>
  <div :class="{ 'mb-4': !showBottom }" class="flex flex-col gap-6">
    <ViewBarTop />
    <ViewBarBottom v-if="showBottom" />
  </div>
</template>
