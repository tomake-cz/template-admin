<script setup lang="ts" generic="T extends InputValue">
import { InputProps, InputRoot } from '~/types/input';

interface Props extends InputProps<T>, InputRoot {}
const props = defineProps<Props>();

const validity = reactive({
  schema: props.validity?.schema,
  conditions: props.validity?.conditions ?? [],
});
if (props.required) {
  validity.conditions.unshift(useAppStore().inputs.default.required);
}

const isValid = ref(false);
const check = (val: T) => {
  if (val == null || val === '') {
    isValid.value = !props.required;
    return isValid.value;
  }
  if (typeof val !== 'string' && typeof val !== 'number') {
    isValid.value = true;
    return isValid.value;
  }
  if (!validity.schema) {
    isValid.value = true;
    return isValid.value;
  }

  let cleanedVal: string | number;
  if (props.html && typeof val === 'string') {
    cleanedVal = val.replace(/<\/?[^>]+(>|$)/g, '');
  } else {
    cleanedVal = val;
  }

  isValid.value = validity.schema.safeParse(cleanedVal).success;
  return isValid.value;
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="label" class="flex items-center">
      <label :class="{ 'text-sm': isSmaller }" class="uppercase">
        <span>{{ label }}</span>
        <span v-if="required" class="text-site-2">*</span>
      </label>
      <AppInputError v-if="!isValid" :conditions="validity.conditions" />
    </div>
    <p v-if="info" class="text-sm font-normal">{{ info }}</p>
    <AppInputValue
      :id="id"
      v-slot="{ currValue, updateCachedInput }"
      :value="(value as T)"
      :required="required ?? false"
      :type="type"
      :schema="validity?.schema"
    >
      <slot
        :curr-value="currValue"
        :update-cached-input="updateCachedInput"
        :validated="check(currValue as T)"
      />
    </AppInputValue>
  </div>
</template>
