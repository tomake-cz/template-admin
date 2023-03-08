<script setup lang="ts">
defineEmits(['click']);
</script>

<template>
  <button
    type="button"
    class="rounded bg-site-1 py-2 px-4 font-bold text-white hover:bg-site-2"
    @click="$emit('click')"
  >
    Odeslat
  </button>
</template>
