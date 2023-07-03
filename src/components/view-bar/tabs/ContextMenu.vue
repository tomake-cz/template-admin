<script setup lang="ts">
defineProps<{
  open: boolean;
  pos: {
    top: number;
    left: number;
  };
}>();

const emit = defineEmits(['close']);

const { contextMenu } = toRefs(storeToRefs(useAppStore()).views.value.tabs);
const { run } = useActionStore();
const onClick = (name: string) => {
  run(name);
  emit('close');
};
</script>

<template>
  <AppContextMenu :open="open" :pos="pos" teleport @close="$emit('close')">
    <div class="flex flex-col items-start">
      <template v-for="action in contextMenu" :key="action.id">
        <button
          class="p-4 py-2 text-sm font-bold text-gray-lighter first:pt-4 last:pb-4 hover:underline"
          @click="onClick(action.name)"
        >
          {{ action.text }}
        </button>
      </template>
    </div>
  </AppContextMenu>
</template>
