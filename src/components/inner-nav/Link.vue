<script setup lang="ts">
const props = defineProps<{
  link: {
    title: string;
    url: string;
  };
}>();
const { title, url } = toRefs(props.link);
const route = useRoute();
const path = ref(
  '/' +
    route.path
      .split('/')
      .filter((s) => s)
      .join('/'),
);
const isActive = computed(() => {
  if (Object.keys(route.params).length > 0) {
    const p = path.value.split('/');
    return url.value === p.slice(0, p.length - 1).join('/');
  }
  return url.value === path.value;
});
</script>

<template>
  <NuxtLink
    :to="url"
    :class="[isActive ? 'text-black-light' : 'text-gray-darker']"
    class="text-sm"
  >
    {{ title }}
  </NuxtLink>
</template>
