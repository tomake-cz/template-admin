<script setup lang="ts">
defineProps<{
  idealWidth: number;
  idealHeight: number;
  formats: string[];
  bestFormats: string[];
}>();
</script>

<template>
  <div class="text-xs font-normal">
    Zde nahrajte obrázek: (Ideální velikost
    <span class="font-bold">{{ idealWidth }}x{{ idealHeight }}px</span>)
    <br />
    Nahrát můžete formáty {{ formats.join(', ') }} nejlepší jsou
    <span class="font-bold">{{ bestFormats.join(', ') }}</span>
  </div>
</template>
