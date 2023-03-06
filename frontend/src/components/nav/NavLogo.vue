<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { logo } = storeToRefs(useAppDataStore());
</script>

<template>
  <img :src="logo" alt="" />
</template>
