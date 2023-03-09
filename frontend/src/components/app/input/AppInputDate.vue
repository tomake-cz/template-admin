<script setup lang="ts">
const props = defineProps<{
  label: string;
  info?: string;
  value?: string;
  id: string;
  isSmaller?: boolean;
}>();
const { label } = toRefs(props);
</script>

<template>
  <AppInput :id="id" :label="label" :info="info" :is-smaller="isSmaller">
    <input
      :id="useIdPrefix(id)"
      type="datetime-local"
      class="text-xs font-normal"
    />
  </AppInput>
</template>
