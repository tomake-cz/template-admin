<script setup lang="ts">
import { InputProps } from '~/types/input';

interface Props extends InputProps<number> {
  maxLength?: number;
}
const props = withDefaults(defineProps<Props>(), {
  maxLength: Infinity,
});
const max = ref(
  props.maxLength === Infinity ? 99999 : '9'.repeat(props.maxLength),
);

const inp = ref<HTMLInputElement>();
</script>

<template>
  <AppInput
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :required="required"
    type="number"
  >
    <template #default="{ currValue, updateCachedInput }">
      <div class="relative">
        <input
          :id="useIdPrefix(id)"
          ref="inp"
          :value="currValue"
          type="number"
          :min="-max"
          :max="max"
          class="input w-full font-normal"
          @input="
            () => {
              if (inp) inp.value = inp.value.slice(0, maxLength);
              updateCachedInput(Number(inp?.value ?? -1));
            }
          "
        />
        <span
          v-if="currValue != null && maxLength !== Infinity"
          class="pointer-events-none absolute right-2 top-2 text-xs text-gray-darker"
        >
          {{ useRemainingCharacters(currValue.toString(), maxLength) }}
        </span>
      </div>
    </template>
  </AppInput>
</template>
