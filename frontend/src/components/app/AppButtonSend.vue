<script setup lang="ts">
defineEmits(['click']);
</script>

<template>
  <button
    type="button"
    class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    @click="$emit('click')"
  >
    Odeslat
  </button>
</template>
