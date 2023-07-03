<script setup lang="ts">
defineProps<{
  icon: {
    url: string;
    alt: string;
  };
  size: 'sm' | 'md' | 'lg' | 'xl' | 'cs';
}>();
</script>

<template>
  <img
    :src="useAsset(icon.url)"
    :alt="icon.alt"
    :class="[
      { 'h-[10px] w-[10px]': size === 'sm' },
      { 'h-4 w-4': size === 'md' },
      { 'h-5 w-5': size === 'lg' },
      { 'h-6 w-6': size === 'xl' },
    ]"
  />
</template>
