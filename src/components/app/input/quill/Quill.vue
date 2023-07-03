<script setup lang="ts">
import { InputProps } from '~/types/input';

interface Props extends InputProps<string> {
  toolbar?: ExtendedToolbar;
  validity?: InputValidity;
}
withDefaults(defineProps<Props>(), {
  toolbar: 'essential',
  validity: undefined,
});
</script>

<template>
  <AppInput
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :is-smaller="isSmaller"
    :required="required"
    type="string"
    :validity="validity"
    html
  >
    <template #default="{ currValue, updateCachedInput }">
      <AppInputQuillInput
        :value="currValue"
        :toolbar="toolbar"
        @input="updateCachedInput"
      />
    </template>
  </AppInput>
</template>
