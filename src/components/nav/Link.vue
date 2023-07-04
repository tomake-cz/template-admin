<script setup lang="ts">
const props = defineProps<{
  link: {
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
const isActive = computed(() => '/' + route.path.split('/')[1] === url.value);
const isHover = ref(false);
</script>

<template>
  <NuxtLink
    :to="url"
    :class="{ 'bg-black-dark': isActive }"
    class="flex rounded-[12px] p-4"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <AppIcon
      :icon="icon"
      size="lg"
      :class="[isHover ? 'icon-gray-lighter' : 'icon-gray-dark']"
      class="mr-2"
    />
    <span
      :class="[isHover ? 'text-gray-lighter' : 'text-gray-dark']"
      class="text-sm"
    >
      {{ title }}
    </span>
  </NuxtLink>
</template>
