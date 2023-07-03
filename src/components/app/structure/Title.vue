<script setup lang="ts">
const { translateURL } = storeToRefs(useAppStore());
const route = useRoute();
const path = ref(
  '/' +
    route.path
      .split('/')
      .filter((s) => s)
      .join('/'),
);
const title = ref(translateURL.value(path.value));
</script>

<template>
  <h1 class="text-3xl">{{ title }}</h1>
</template>
