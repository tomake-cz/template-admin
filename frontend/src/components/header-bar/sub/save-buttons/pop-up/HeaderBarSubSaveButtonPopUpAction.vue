<script setup lang="ts">
defineProps<{
  isLast: boolean;
  action: {
    text: string;
    shortcut: string;
  };
}>();

defineEmits(['close']);
</script>

<template>
  <button
    :class="{
      'rounded-b-xl border-t-2 border-solid border-gray-lighter': isLast,
    }"
    class="flex h-[46px] items-center justify-between px-4 text-xs first:rounded-xl"
    @click="$emit('close')"
  >
    <span :class="[isLast ? 'text-site-1' : 'text-gray-lighter']">
      {{ action.text }}
    </span>
    <span
      v-if="action.shortcut"
      class="rounded-xl bg-gray-darker p-2 text-gray-lighter"
    >
      {{ action.shortcut }}
    </span>
  </button>
</template>
