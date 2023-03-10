<script setup lang="ts">
let upload = () => {
  console.log('fallback');
};

onMounted(() => {
  upload = useGetMutation() ?? upload;
});
</script>

<template>
  <button type="button" @click="upload">
    <slot />
  </button>
</template>
