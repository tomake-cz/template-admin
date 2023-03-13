<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean;
  actions: {
    id: number;
    name: string;
    text: string;
    shortcut: string;
  }[];
}>();
const { actions } = toRefs(props);

defineEmits(['close']);
</script>

<template>
  <div>
    <Transition>
      <div
        v-if="isVisible"
        class="absolute top-12 right-0 z-50 flex w-[332px] flex-col rounded-[12px] bg-black-light"
      >
        <template
          v-for="(action, i) in actions"
          :key="action.id + action.action"
        >
          <HeaderBarSubButtonsPopUpAction
            :is-last="i === actions.length - 1"
            :action="action"
            @close="$emit('close')"
          />
        </template>
      </div>
    </Transition>
    <UtilClickArea v-if="isVisible" @close="$emit('close')" />
  </div>
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
