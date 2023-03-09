<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    info?: string;
    text: string;
    value?: boolean;
    id: string;
    isSmaller?: boolean;
  }>(),
  {
    info: '',
    value: false,
    isSmaller: false,
  },
);

const isChecked = ref(false);
</script>

<template>
  <AppInput :id="id" :label="label" :info="info" :is-smaller="isSmaller">
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
          v-model="isChecked"
          type="checkbox"
          class="hidden"
        />
        <span
          :class="[isChecked ? 'translate-x-4 bg-site-2' : 'bg-site-1']"
          class="pointer-events-none absolute left-px h-[14px] w-[14px] rounded-full transition-all"
        />
      </label>
    </div>
  </AppInput>
</template>
