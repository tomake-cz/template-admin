<script setup lang="ts">
const { firstNestedLink } = storeToRefs(useAppStore());
const router = useRouter();
router.push(firstNestedLink.value.url);
</script>

<template>
  <div></div>
</template>
