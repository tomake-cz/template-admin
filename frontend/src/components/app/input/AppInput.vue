<script setup lang="ts">
defineProps<{
  label: string;
  name?: string;
  info?: string;
  isSmaller: boolean;
}>();
</script>

<template>
  <div class="mb-2 flex flex-col">
    <label :for="name" :class="{ 'text-sm': isSmaller }" class="mb-2 uppercase">
      {{ label }}
    </label>
    <p v-if="info" class="mb-2 text-sm font-normal">{{ info }}</p>
    <slot />
  </div>
</template>
