<script setup lang="ts">
const props = defineProps<{
  placeholder?: string;
  focus?: boolean;
}>();

const value = ref('');
const emit = defineEmits<{
  (event: 'update:modelValue', e: string): void;
}>();

const input = ref<HTMLInputElement>();
onMounted(() => {
  if (props.focus) {
    input.value?.focus();
  }
});
</script>

<template>
  <input
    ref="input"
    v-model="value"
    type="text"
    :placeholder="placeholder"
    class="rounded-md border border-gray-darker bg-gray-light p-2 text-xs font-normal text-gray-darker"
    @input="emit('update:modelValue', value)"
  />
</template>
