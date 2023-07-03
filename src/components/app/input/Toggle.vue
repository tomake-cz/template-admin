<script setup lang="ts">
import { InputProps } from '~/types/input';

interface Props extends InputProps<boolean> {
  text: string;
}
defineProps<Props>();

const inp = ref<HTMLInputElement>();
</script>

<template>
  <AppInput
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :is-smaller="isSmaller"
    :required="required"
    type="boolean"
  >
    <template #default="{ currValue, updateCachedInput }">
      <div class="flex items-center gap-2">
        <label :for="useIdPrefix(id)" class="text-xs font-normal">{{
          text
        }}</label>
        <label
          :for="useIdPrefix(id)"
          class="relative h-4 w-8 cursor-pointer rounded-full bg-gray-lighter p-px"
        >
          <input
            :id="useIdPrefix(id)"
            ref="inp"
            :checked="currValue ?? false"
            type="checkbox"
            class="hidden"
            @input="updateCachedInput(inp?.checked)"
          />
          <span
            :class="[currValue ? 'translate-x-4 bg-site-2' : 'bg-site-1']"
            class="pointer-events-none absolute left-px h-[14px] w-[14px] rounded-full transition-all"
          />
        </label>
      </div>
    </template>
  </AppInput>
</template>
