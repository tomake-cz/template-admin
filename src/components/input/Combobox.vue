<script setup lang="ts">
const props = defineProps<{
  options: {
    name: string;
    translated: string;
    [key: string]: string | number | boolean;
  }[];
  initial?: string;
  notFound?: string;
}>();

const emit = defineEmits<{
  (event: 'select', name: string): void;
}>();

const { dropdownIcon, notFound, initial } = toRefs(
  useAppStore().inputs.combobox,
);

const notFoundText = ref(props.notFound ?? notFound.value);

const selected = ref(props.initial ?? initial.value);
const setSelected = (name: string) => {
  const translated = props.options.find((o) => o.name === name)?.translated;
  emit('select', name);

  selected.value = translated ?? '';
};

const query = ref('');
const setQuery = (e: Event) => {
  query.value = (e.target as HTMLInputElement).value;
};

const opts = computed(() => {
  return props.options.filter(({ translated }) =>
    translated.toLowerCase().includes(query.value.toLowerCase()),
  );
});

const width = ref(0);
onMounted(() => {
  width.value =
    Math.max(...props.options.map((o) => o.translated.length), 10) + 3;
});
</script>

<template>
  <HeadlessCombobox :model-value="selected" @update:model-value="setSelected">
    <div :style="`width: ${width}ch`" class="relative text-xs font-normal">
      <div
        class="flex items-center rounded-md border border-gray-darker bg-gray-light"
      >
        <HeadlessComboboxInput
          class="w-full p-2 text-gray-darker"
          @change="setQuery"
        />
        <HeadlessComboboxButton class="p-2">
          <AppIcon :icon="dropdownIcon" size="sm" class="icon-gray-darker" />
        </HeadlessComboboxButton>
      </div>
      <HeadlessComboboxOptions
        class="absolute z-10 w-full rounded-md border border-gray-darker bg-gray-light p-2"
      >
        <template v-if="opts.length <= 0">
          <div class="cursor-pointer rounded-sm p-1 hover:bg-gray-dark">
            {{ notFoundText }}
          </div>
        </template>
        <template v-else>
          <HeadlessComboboxOption
            v-for="(option, i) in opts"
            :key="i"
            :value="option.name"
            as="template"
          >
            <div class="cursor-pointer rounded-sm p-1 hover:bg-gray-dark">
              {{ option.translated }}
            </div>
          </HeadlessComboboxOption>
        </template>
      </HeadlessComboboxOptions>
    </div>
  </HeadlessCombobox>
</template>
