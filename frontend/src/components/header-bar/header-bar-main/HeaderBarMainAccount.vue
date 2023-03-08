<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

const { accountIcon } = storeToRefs(useAppDataStore());
</script>

<template>
  <div>
    <img :src="useAsset(accountIcon.url)" :alt="accountIcon.alt" />
  </div>
</template>
