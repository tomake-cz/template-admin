<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>

<template>
  <ViewBarTabsTabTemplate
    :class="
      active
        ? 'bg-gray-lighter text-black-light'
        : 'bg-gray-light text-gray-darker'
    "
    class="hover:text-black-light"
  >
    <slot />
  </ViewBarTabsTabTemplate>
</template>
