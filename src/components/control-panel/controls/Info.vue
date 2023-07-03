<script setup lang="ts">
defineProps<{
  label: string;
}>();

const random = Math.random().toString();

const { profileIcon } = storeToRefs(useAppStore()).controlPanel.value.controls;

const account = 'TOMAKE_admin';
const date = new Date(1678460550666);
</script>

<template>
  <AppInput
    :id="random"
    :label="label"
    is-smaller
    :required="false"
    type="string"
  >
    <div class="flex gap-2">
      <AppIcon :icon="profileIcon" size="lg" />
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
