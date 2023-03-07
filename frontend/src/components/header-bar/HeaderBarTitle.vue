<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { title } = toRefs(storeToRefs(useAppDataStore()));
</script>

<template>
  <h1 class="text-4xl">{{ title }}</h1>
</template>
