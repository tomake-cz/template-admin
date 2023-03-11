<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { firstNestedLink } = storeToRefs(useAppDataStore());
const router = useRouter();
router.push(firstNestedLink.value.url);
</script>

<template>
  <div></div>
</template>
