<script setup lang="ts">
const props = defineProps<{
  checked?: boolean;
  size: 'sm' | 'md';
  styling: 'white' | 'transparent';
  name?: string;
  disabled?: boolean;
}>();

const isChecked = ref(props.checked ?? false);
watch(
  () => props.checked,
  (checked) => {
    isChecked.value = checked ?? false;
  },
);

defineEmits<{
  (event: 'toggle', state: boolean): void;
}>();

const { checkmarkIcon } = toRefs(useAppStore().inputs.checkbox);
</script>

<template>
  <label
    :class="[
      { 'h-[10px] w-[10px]': size === 'sm' },
      { 'h-4 w-4': size === 'md' },
      { 'border-none bg-gray-light': styling === 'white' },
      { 'border-2 border-gray-darker': styling === 'transparent' },
    ]"
    class="relative flex cursor-pointer select-none items-center justify-center rounded-sm"
  >
    <input
      v-model="isChecked"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      class="hidden"
      @input="$emit('toggle', !isChecked)"
    />
    <img
      v-if="isChecked"
      :src="useAsset(checkmarkIcon.url)"
      :alt="checkmarkIcon.alt"
      :class="[
        { 'h-2 w-[6px]': size === 'sm' && styling === 'transparent' },
        { 'h-2 w-2': size === 'sm' && styling === 'white' },
        { 'h-[14px] w-[10px]': size === 'md' && styling === 'transparent' },
        { 'h-[14px] w-[12px]': size === 'md' && styling === 'white' },
      ]"
      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </label>
</template>
