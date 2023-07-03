<script setup lang="ts">
const { title } = storeToRefs(useAppStore());
</script>

<template>
  <h1 class="text-4xl">{{ title }}</h1>
</template>
