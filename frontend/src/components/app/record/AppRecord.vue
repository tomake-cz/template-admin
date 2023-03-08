<script setup lang="ts">
const route = useRoute();
const path = route.path.split('/')[1];
const title = path.slice(0, 1).toUpperCase() + path.slice(1);
</script>

<template>
  <div class="flex h-full justify-between">
    <AppNav />
    <div class="grow py-12 px-6">
      <div class="mb-12">
        <h1 class="text-3xl">{{ title }}</h1>
        <AppRevisionHistory />
      </div>
      <div class="flex flex-col gap-6">
        <slot />
      </div>
    </div>
    <AppControlPanel />
  </div>
</template>
