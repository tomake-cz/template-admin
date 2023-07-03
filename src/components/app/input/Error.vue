<script setup lang="ts">
defineProps<{
  conditions: string[];
}>();

const { popup, icon } = toRefs(useAppStore().inputs.default.error);

const isHover = ref(false);
</script>

<template>
  <div
    class="relative px-2 py-1"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <AppIcon :icon="icon" size="md" />
    <div
      v-if="isHover"
      class="absolute -left-16 bottom-6 flex flex-col gap-[0.5px] rounded-[12px] bg-black-light p-2"
    >
      <span class="whitespace-nowrap text-gray-lighter">{{ popup.title }}</span>
      <span
        class="min-w-[13rem] whitespace-nowrap font-normal text-gray-lighter"
      >
        <template v-for="(condition, i) in conditions" :key="i">
          {{ popup.point }} {{ condition }} <br />
        </template>
      </span>
    </div>
  </div>
</template>
