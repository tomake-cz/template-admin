<script setup lang="ts">
const { addIcon } = toRefs(storeToRefs(useAppStore()).views.value.tabs);

const add = () => {
  useActionStore().run('createView');
};
</script>

<template>
  <ViewBarTabsTabTemplate class="bg-gray-dark" @click="add">
    <div class="flex h-5 w-5 items-center justify-center">
      <AppIcon :icon="addIcon" size="sm" class="icon-site-2" />
    </div>
  </ViewBarTabsTabTemplate>
</template>
