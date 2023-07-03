<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/capi';

const checkedCount = inject('checkedCount') as Ref<number>;
</script>

<template>
  <div class="flex w-full items-center justify-between bg-gray-light px-6">
    <ViewBarTabs />
    <ViewBarTopControls v-if="checkedCount === 0" />
    <ViewBarOptions v-else />
  </div>
</template>
