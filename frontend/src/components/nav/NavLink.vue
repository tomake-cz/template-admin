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

const route = useRoute();
const isActive = computed(() => route.path === url.value);
const isHover = ref(false);
</script>

<template>
  <NuxtLink
    :to="url"
    :class="{ 'bg-black-dark': isActive }"
    class="flex rounded-xl p-5"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <img
      :src="useAsset(icon.url)"
      :alt="icon.alt"
      :class="[isHover ? 'icon-gray-lighter' : 'icon-gray-dark']"
      class="mr-2 h-5 w-5"
    />
    <span
      :class="[isHover ? 'text-gray-lighter' : 'text-gray-dark']"
      class="text-sm"
    >
      {{ title }}
    </span>
  </NuxtLink>
</template>
