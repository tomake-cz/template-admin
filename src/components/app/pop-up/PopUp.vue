<script setup lang="ts">
withDefaults(
  defineProps<{
    open: boolean;
    pos: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    animate?: boolean;
    teleport?: boolean;
  }>(),
  {
    animate: true,
    teleport: false,
  },
);

defineEmits(['close']);

const getPos = (n?: number) => {
  if (n === undefined) {
    return 'auto';
  }
  return n + 'px';
};
</script>

<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition :name="animate ? 'anim' : ''">
      <div
        v-if="open"
        :style="`top: ${getPos(pos.top)}; bottom: ${getPos(pos.bottom)}; 
        left: ${getPos(pos.left)}; right: ${getPos(pos.right)};`"
        class="absolute z-50 rounded-[12px] bg-black-light"
      >
        <slot />
      </div>
    </Transition>
    <AppClickArea v-if="open" @close="$emit('close')" />
  </Teleport>
</template>

<style scoped>
.anim-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.anim-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.anim-enter-active {
  transition: all 0.3s ease;
}
</style>
