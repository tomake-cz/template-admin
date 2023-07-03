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

const { getPage } = usePageStore();
const loading = computed(() => getPage()?.loading);
</script>

<template>
  <button
    :id="useHyphenPath() + '-header-main-button'"
    type="button"
    :disabled="loading"
    class="rounded-full bg-site-2 px-4 py-2 hover:bg-site-2-dark"
    @click="actionFn"
  >
    <span v-if="loading" class="animate-spin">I</span>
    <span v-else>{{ action.text }}</span>
  </button>
</template>
