<script setup lang="ts">
const props = defineProps<{
  label?: string;
  info?: string;
  value?: string | number;
  name?: string;
  maxLength?: number;
}>();
const { maxLength } = toRefs(props);
const value = ref<string | number | undefined>(undefined);

// to update input value when prop value fetches
onMounted(() => {
  watchEffect(() => {
    value.value = props.value;
  });
});

const remainingChars = computed(() => {
  if (value?.value && maxLength?.value) {
    return maxLength.value - value.value.toString().length;
  }
  return maxLength?.value ?? 0;
});
</script>

<template>
  <AppInput :label="{ text: label, name }" :info="info">
    <template #default>
      <div class="relative">
        <input
          v-model="value"
          type="text"
          :name="name"
          class="input w-full font-normal"
        />
        <span
          v-if="value != null"
          class="pointer-events-none absolute top-2 right-2 text-xs text-gray-darker"
        >
          {{ remainingChars }}
        </span>
      </div>
    </template>
  </AppInput>
</template>
