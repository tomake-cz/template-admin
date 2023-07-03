<script setup lang="ts">
defineProps<{
  open: boolean;
  icon: {
    url: string;
    alt: string;
  };
}>();

const { dropdownIcon } = toRefs(useAppStore().views);
</script>

<template>
  <div class="flex items-center gap-1 rounded-full bg-gray-dark px-3 py-2">
    <AppIcon :icon="icon" size="sm" />
    <span class="text-xs font-normal text-black-light">
      <slot />
    </span>
    <AppIcon
      :icon="dropdownIcon"
      size="sm"
      :class="{ 'rotate-45': open }"
      class="icon-site-2 ml-1 transition-all"
    />
  </div>
</template>
