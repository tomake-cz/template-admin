<script setup lang="ts">
const props = defineProps<{
  link: {
    id: number;
    title: string;
    url: string;
    icon: {
      url: string;
      alt: string;
    };
  };
}>();
const { title, url, icon } = toRefs(props.link);
</script>

<template>
  <NuxtLink :to="url" class="flex rounded-xl p-5 hover:bg-black-dark">
    <img
      :src="useAsset(icon.url)"
      :alt="icon.alt"
      class="icon-gray-dark mr-2 h-5 w-5"
    />
    <span class="text-sm text-gray-dark">{{ title }}</span>
  </NuxtLink>
</template>
