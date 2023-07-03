<script setup lang="ts">
defineProps<{
  isVisible: boolean;
}>();

defineEmits(['close', 'remove']);
</script>

<template>
  <Transition>
    <div
      v-if="isVisible"
      class="absolute right-0 top-10 z-50 flex w-[332px] flex-col rounded-[12px] bg-black-light p-2"
    >
      <button class="text-site-1 hover:underline" @click="$emit('remove')">
        Remove
      </button>
    </div>
  </Transition>
  <AppClickArea v-if="isVisible" @close="$emit('close')" />
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.v-enter-active {
  transition: all 0.3s ease;
}
</style>
