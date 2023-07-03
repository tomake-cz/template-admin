<script setup lang="ts">
const { text, icon, placeholder } = toRefs(
  storeToRefs(useAppStore()).views.value.controls.filter,
);

const { addViewFilter } = useViewStore();
const action = ({ name }: Key) => {
  addViewFilter({ key: name, type: 'none', constraint: 'is', value: '' });
};
</script>

<template>
  <ViewBarKeySelect :action="action" :icon="icon" :placeholder="placeholder">
    <template #button>
      <span class="mr-1">{{ text }}</span>
    </template>
  </ViewBarKeySelect>
</template>
