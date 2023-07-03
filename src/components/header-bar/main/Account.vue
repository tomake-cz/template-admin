<script setup lang="ts">
const { accountIcon } = storeToRefs(useAppStore());
</script>

<template>
  <div>
    <AppIcon :icon="accountIcon" size="cs" class="h-9 w-9" />
  </div>
</template>
