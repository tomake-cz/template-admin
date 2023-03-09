<script setup lang="ts">
const props = defineProps<{
  link: {
    title: string;
    url: string;
  };
}>();
const { title, url } = toRefs(props.link);
const route = useRoute();
const isActive = computed(() => route.path === url.value);
</script>

<template>
  <NuxtLink
    :to="url"
    :class="[isActive ? 'text-black-light' : 'text-gray-darker']"
  >
    {{ title }}
  </NuxtLink>
</template>
