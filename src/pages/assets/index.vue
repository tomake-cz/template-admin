<script setup lang="ts">
onMounted(() => {
  const { set } = useMutationStore();
  set('delete', (ids) => {
    return useTRPC().asset.deleteMany.mutate(ids);
  });
});

const { data, pending, refresh } = await useTRPC().asset.getAll.useQuery();
usePageStore().setPageValues({
  refresh,
});
</script>

<template>
  <AppStructure name="assets" :data="data" :loading="pending" />
</template>
