<script setup lang="ts">
defineProps<{
  asset: Asset;
}>();

const { uploadedFile } = toRefs(useAppStore().inputs.asset);
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-xs font-normal">{{ uploadedFile }}</span>
    <div class="flex items-center gap-2">
      <span class="text-xs">{{ asset.name }}</span>
      <span class="text-xs font-normal">•</span>
      <span class="text-xs">{{ useByteFormat(asset.size) }}</span>
      <span class="text-xs font-normal">•</span>
      <span class="text-xs">{{
        asset.type.replace('image/', '').toUpperCase()
      }}</span>
    </div>
  </div>
</template>
