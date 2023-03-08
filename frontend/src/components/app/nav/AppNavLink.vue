<script setup lang="ts">
const props = defineProps<{
  link: {
    title: string;
    url: string;
  };
}>();
const { title, url } = toRefs(props.link);
</script>

<template>
  <NuxtLink :to="url" class="text-gray-darker">{{ title }}</NuxtLink>
</template>
