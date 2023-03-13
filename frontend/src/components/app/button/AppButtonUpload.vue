<script setup lang="ts">
const props = defineProps<{
  action: {
    id: number;
    name: string;
    text: string;
    shortcut: string;
  };
}>();
const { name, text } = toRefs(props.action);

const actionFn = useGetAction(name.value);
</script>

<template>
  <button type="button" @click="actionFn">{{ text }}</button>
</template>
