<script setup lang="ts">
import { InputProps } from '~/types/input';

defineProps<InputProps<string>>();
</script>

<template>
  <AppInputText
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :is-smaller="isSmaller"
    :required="required"
    :validity="{
      schema: z.string().email(),
      conditions: ['Musíte zadat platnou e-mailovou adresu.'],
    }"
  />
</template>
