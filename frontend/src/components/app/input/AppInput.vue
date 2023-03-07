<script setup lang="ts">
defineProps<{
  label: {
    text?: string;
    name?: string;
  };
  info?: string;
}>();
</script>

<template>
  <div class="mb-2 flex flex-col">
    <label :for="label.name" class="mb-2 text-lg font-bold uppercase">{{
      label.text
    }}</label>
    <p v-if="info" class="mb-2 text-sm font-normal">{{ info }}</p>
    <slot />
  </div>
</template>
