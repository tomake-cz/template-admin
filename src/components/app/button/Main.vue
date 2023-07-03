<script setup lang="ts">
const props = defineProps<{
  action: {
    id: number;
    name: string;
    text: string;
    shortcut: string;
  };
}>();
const { action } = toReactive(props);

const actionFn = ref<Action>();
onMounted(async () => {
  await nextTick(() => {
    actionFn.value = useActionStore().get(action.name);
  });
});
</script>

<template>
  <button type="button" @click="actionFn">{{ action.text }}</button>
</template>
