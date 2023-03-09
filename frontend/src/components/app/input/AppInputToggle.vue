<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    info?: string;
    text: string;
    value?: boolean;
    id: string;
  }>(),
  {
    info: '',
    value: false,
  },
);

const isChecked = ref(false);
</script>

<template>
  <AppInput :id="id" :label="label" :info="info">
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
          :class="{ 'translate-x-4': isChecked }"
          class="pointer-events-none absolute left-px h-[14px] w-[14px] rounded-full bg-site-2 transition-transform"
        />
      </label>
    </div>
  </AppInput>
</template>
