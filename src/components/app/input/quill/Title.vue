<script setup lang="ts">
import { InputProps } from '~/types/input';

defineProps<InputProps<string>>();
</script>

<template>
  <AppInputQuill
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :is-smaller="isSmaller"
    :required="required"
    :validity="{
      schema: z
        .string()
        .regex(/^[A-Z][a-zá-žA-Ž ]+$/)
        .min(2),
      conditions: [
        'Začínat velkým písmenem',
        'Žádné speciální znaky ($*+-...)',
        'Nesmí obsahovat číslici',
      ],
    }"
  />
</template>
