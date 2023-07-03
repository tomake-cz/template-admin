<script setup lang="ts" generic="T">
type Item = {
  id: number;
  listId: number;
  [key: string]: unknown;
};

const props = defineProps<{
  id: number;
  items: (T extends Item ? T : never)[];
}>();

const dragStart = <T>(e: DragEvent, item: T extends Item ? T : never) => {
  if (!e.dataTransfer) return;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('itemId', item.id.toString());
};

const onDrop = (e: DragEvent) => {
  const itemId = Number(e.dataTransfer?.getData('itemId'));
  const item = props.items.find((item) => item.id === itemId);
  if (item == null) return;

  item.listId = props.id;
};

const onDragOver = (e: DragEvent) => {
  if (!e.dataTransfer) return;
  e.dataTransfer.dropEffect = 'move';
};

const getListItems = (id: number) => {
  return props.items.filter((item) => item.listId === id);
};
</script>

<template>
  <div
    class="min-h-[32px] w-full bg-gray-dark p-2"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent="onDragOver"
  >
    <template v-for="item in getListItems(id)" :key="item.id">
      <div draggable="true" @dragstart="dragStart($event, item)">
        <slot :item="item" />
      </div>
    </template>
  </div>
</template>
