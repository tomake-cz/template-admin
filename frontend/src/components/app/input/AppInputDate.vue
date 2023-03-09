<script setup lang="ts">
const props = defineProps<{
  label: string;
  info?: string;
  value?: string;
  name?: string;
  isSmaller?: boolean;
}>();
const { label } = toRefs(props);
</script>

<template>
  <AppInput :label="label" :info="info" :name="name" :is-smaller="isSmaller">
    <input type="datetime-local" class="text-xs font-normal" />
  </AppInput>
</template>
