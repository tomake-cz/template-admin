<script setup lang="ts">
withDefaults(
  defineProps<{
    pos?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  }>(),
  {
    pos: () => ({
      top: 28,
      right: 0,
    }),
  },
);

const open = ref(false);
defineExpose({
  open,
});

onKeyStroke('Escape', () => {
  open.value = false;
});
</script>

<template>
  <div class="relative flex items-center">
    <button class="flex items-center" @click="open = true">
      <slot name="button" :open="open" />
    </button>
    <client-only>
      <AppPopUp :pos="pos" :open="open" @close="open = false">
        <slot name="popup" :close="() => (open = false)" />
      </AppPopUp>
    </client-only>
  </div>
</template>
