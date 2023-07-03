<script setup lang="ts">
defineProps<{
  // id: number;
  // cachedId: string;
  label?: string;
}>();

defineEmits(['remove']);

const { settingsIcon, dropdownIcon } = toRefs(
  storeToRefs(useAppStore()).inputs.value.group,
);

const isVisible = ref(false);
</script>

<template>
  <div class="rounded-[12px] bg-gray-darker">
    <!-- <AppInputValue :id="cachedId" :value="id" required type="number" /> -->
    <!-- <AppIcon
      :icon="dragIcon"
      size="md"
      class="absolute -left-4 top-8 cursor-move"
    /> -->
    <div
      :class="[label ? 'justify-between' : 'justify-end']"
      class="relative flex w-full items-center rounded-t-[12px] bg-gray-light p-2"
    >
      <h5 v-if="label" class="text-sm uppercase">{{ label }}</h5>
      <div
        class="flex cursor-pointer items-center gap-2"
        @click="isVisible = !isVisible"
      >
        <AppIcon :icon="settingsIcon" size="md" />
        <AppIcon
          :icon="dropdownIcon"
          size="sm"
          :class="isVisible ? '' : '-rotate-45'"
          class="icon-site-2 transition-all"
        />
      </div>
      <AppInputGroupObjectSettings
        v-if="isVisible"
        :is-visible="isVisible"
        @close="isVisible = false"
        @remove="$emit('remove')"
      />
    </div>
    <div class="flex flex-col gap-4 p-2">
      <slot />
    </div>
  </div>
</template>
