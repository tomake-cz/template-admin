<script setup lang="ts">
const { view } = storeToRefs(useViewStore());
</script>

<template>
  <div class="flex h-8 items-center gap-2 px-6">
    <ViewBarSortOptions v-if="view.sortName !== 'none'" />
    <div
      v-if="view.filters.length > 0 && view.sortName !== 'none'"
      class="h-full w-0.5 bg-gray-dark"
    />
    <template v-for="(filter, i) in view.filters" :key="i">
      <ViewBarFilterOptions :filter="filter" :view="view" />
    </template>
  </div>
</template>
