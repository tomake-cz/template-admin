<script setup lang="ts">
defineEmits(['close']);
</script>

<template>
  <div
    class="fixed top-0 left-0 z-40 h-screen w-screen"
    @click="$emit('close')"
  ></div>
</template>
