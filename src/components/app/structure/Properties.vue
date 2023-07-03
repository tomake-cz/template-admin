<script setup lang="ts">
const { setKey } = useViewStore();
const check = ({ name, enabled }: Key) => {
  // const checkbox = e.target as EventTarget & { checked: boolean };
  setKey(name, !enabled);
};

const { icon, placeholder } = toRefs(useAppStore().views.controls.properties);
</script>

<template>
  <ViewBarKeySelect
    :action="check"
    :icon="icon"
    :placeholder="placeholder"
    :disabled-keys="['title']"
    left
    checkbox
  />
</template>
