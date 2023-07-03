<script setup lang="ts">
defineProps<{
  tag: 'button' | 'label';
}>();
</script>

<template>
  <component
    :is="tag"
    class="cursor-pointer rounded-full bg-gray-dark p-2 text-xs"
  >
    <slot />
  </component>
</template>
