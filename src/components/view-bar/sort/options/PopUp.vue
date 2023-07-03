<script setup lang="ts">
const props = defineProps<{
  add: string;
  removeAll: string;
}>();

const { constraints } = toRefs(useAppStore().views.controls);

const btns = ref([
  { text: props.add, icon: constraints.value.add },
  { text: props.removeAll, icon: constraints.value.removeAll },
]);
</script>

<template>
  <div class="min-w-[212px] p-2">
    <div class="mb-2">
      <slot />
    </div>
    <template v-for="({ text, icon }, i) in btns" :key="i">
      <button
        class="flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-xs font-normal text-gray-lighter hover:bg-black-dark"
      >
        <AppIcon :icon="icon" size="sm" class="icon-gray-darker" />
        <span class="whitespace-nowrap text-xs font-normal text-gray-lighter">{{
          text
        }}</span>
      </button>
    </template>
  </div>
</template>
