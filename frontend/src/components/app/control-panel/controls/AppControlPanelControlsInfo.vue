<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppDataStore } from '~~/src/stores/AppDataStore';

defineProps<{
  label: string;
}>();

const random = Math.random().toString();

const { profileIcon } = storeToRefs(useAppDataStore()).controlPanel.value
  .controls;

const account = 'TOMAKE_admin';
const date = new Date(1678460550666);
</script>

<template>
  <AppInput :id="random" :label="label" is-smaller>
    <div class="flex gap-2">
      <img
        :src="useAsset(profileIcon.url)"
        :alt="profileIcon.alt"
        class="h-5 w-5"
      />
      <div class="flex flex-col gap-2 text-xs font-normal">
        <span>{{ account }} </span>
        <span>
          {{ date.toLocaleDateString('cs-CZ') }}
          {{ date.toLocaleTimeString('cs-CZ') }}
        </span>
      </div>
    </div>
  </AppInput>
</template>
