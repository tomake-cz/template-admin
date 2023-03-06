<script setup lang="ts">
const props = defineProps<{
  link: {
    id: number;
    title: string;
    url: string;
    icon: string;
  };
}>();
const { title, url, icon } = toRefs(props.link);
</script>

<template>
  <NuxtLink :to="url" class="flex">
    <img :src="icon" alt="" />
    <span class="text-white">{{ title }}</span>
  </NuxtLink>
</template>
