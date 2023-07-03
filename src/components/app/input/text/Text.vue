<script setup lang="ts">
import { InputProps } from '~/types/input';

interface Props extends InputProps<string> {
  maxLength?: number;
  validity?: InputValidity;
}
const props = withDefaults(defineProps<Props>(), {
  maxLength: Infinity,
  validity: undefined,
});

const inp = ref<HTMLInputElement>();
</script>

<template>
  <AppInput
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :required="required"
    type="string"
    :validity="props.validity"
  >
    <template #default="{ currValue, updateCachedInput }">
      <div class="relative">
        <input
          :id="useIdPrefix(id)"
          ref="inp"
          :value="currValue"
          type="text"
          :maxlength="maxLength ?? Infinity"
          class="input w-full font-normal"
          @input="updateCachedInput(inp?.value)"
        />
        <span
          v-if="currValue != null && maxLength !== Infinity"
          class="pointer-events-none absolute right-2 top-2 text-xs text-gray-darker"
        >
          {{ useRemainingCharacters(currValue as string, maxLength) }}
        </span>
      </div>
    </template>
  </AppInput>
</template>
