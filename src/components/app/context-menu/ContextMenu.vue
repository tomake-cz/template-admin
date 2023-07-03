<script setup lang="ts">
defineProps<{
  open: boolean;
  pos: {
    top: number;
    left: number;
  };
}>();

defineEmits(['close']);
</script>

<template>
  <AppPopUp :open="open" :pos="pos" :animate="false" @close="$emit('close')">
    <slot />
  </AppPopUp>
</template>
