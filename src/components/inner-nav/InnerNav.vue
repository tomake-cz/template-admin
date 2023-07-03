<script setup lang="ts">
const { childGroups: groups, isNavFixed } = storeToRefs(useAppStore());
const route = useRoute();
const site = route.path.split('/')[1];
</script>

<template>
  <nav class="relative h-full w-60">
    <div
      :class="[isNavFixed ? 'fixed top-12' : 'absolute']"
      class="h-full w-[inherit] bg-gray-dark px-6 py-12"
    >
      <template v-for="group in groups(site)" :key="group.id + group.title">
        <InnerNavGroup :group="group" />
      </template>
    </div>
  </nav>
</template>
