<script setup lang="ts" generic="T extends InputValue">
const props = defineProps<{
  id: string;
  value?: T | null;
  required: boolean;
  type: InputType;
  schema?: InputValidity['schema'];
}>();

const {
  hasCachedInput,
  getCachedInput,
  setInput,
  setCachedInput,
  removeCachedInput,
  setInfoInput,
} = useInputStore();

setInfoInput({
  name: props.id,
  required: props.required,
  type: props.type,
  schema: props.schema,
});

const value = ref<T | null>();
const updateCachedInput = (val: typeof props.value) => {
  setCachedInput({
    name: props.id,
    value: val,
    required: props.required,
    type: props.type,
    schema: props.schema,
  });
  value.value = val;
};

const deleteCachedInput = () => {
  removeCachedInput(props.id);
  value.value = null;
};

// to update input value when prop value fetches
onMounted(() => {
  if (props.value) {
    value.value = props.value;
    setInput({
      name: props.id,
      value: props.value,
      required: props.required,
      type: props.type,
      schema: props.schema,
    });
  }

  if (hasCachedInput(props.id)) {
    value.value = getCachedInput(props.id)?.value as T;
  }

  watch(
    () => props.value,
    () => {
      if (hasCachedInput(props.id)) {
        return;
      }
      value.value = props.value;
      setInput({
        name: props.id,
        value: props.value,
        required: props.required,
        type: props.type,
        schema: props.schema,
      });
    },
  );
});

// to update the value when user switches between revisions
watch(
  () => useInputStore().getCachedInput(props.id),
  (v) => {
    if (!v || v.value === value.value) return;
    value.value = v.value as T;
  },
);
</script>

<template>
  <slot
    :curr-value="value"
    :update-cached-input="updateCachedInput"
    :remove-cached-input="deleteCachedInput"
  />
</template>
