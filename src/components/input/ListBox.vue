<script setup lang="ts">
const props = defineProps<{
  options: {
    name: string;
    translated: string;
    [key: string]: string | number | boolean;
  }[];
  initial: string;
}>();

const emit = defineEmits<{
  (event: 'select', option: (typeof props.options)[0]): void;
}>();

const { listbox } = toRefs(useAppStore().inputs);

const selected = ref(props.initial);

const onUpdate = (value: string) => {
  const option = props.options.find((o) => o.translated === value);
  if (!option) return;

  emit('select', option);
};
</script>

<template>
  <HeadlessListbox v-model="selected" @update:model-value="onUpdate">
    <div class="relative text-xs font-normal">
      <HeadlessListboxButton class="flex items-center gap-2">
        <span class="text-gray-lighter">{{ selected }}</span>
        <AppIcon :icon="listbox.dropdownIcon" size="sm" />
      </HeadlessListboxButton>
      <HeadlessListboxOptions
        class="absolute z-10 rounded-md bg-black-light p-2"
      >
        <HeadlessListboxOption
          v-for="option in options"
          :key="option.name"
          :value="option.translated"
          as="template"
        >
          <div
            class="cursor-pointer whitespace-nowrap rounded-sm p-1 text-gray-lighter hover:bg-black-dark"
          >
            {{ option.translated }}
          </div>
        </HeadlessListboxOption>
      </HeadlessListboxOptions>
    </div>
  </HeadlessListbox>
</template>
