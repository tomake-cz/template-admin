<script setup lang="ts">
const { text, icon, placeholder } = toRefs(
  storeToRefs(useAppStore()).views.value.controls.sort,
);

const { setView } = useViewStore();
const action = ({ name }: Key) => {
  setView({
    sortName: name,
  });
};
</script>

<template>
  <ViewBarKeySelect :action="action" :icon="icon" :placeholder="placeholder">
    <template #button>
      <span class="mr-1">{{ text }}</span>
    </template>
  </ViewBarKeySelect>
</template>
