<script setup lang="ts">
onMounted(() => {
  const { set } = useMutationStore();
  set('delete', (ids) => {
    return useTRPC().multi.deleteMany.mutate(ids);
  });
  set('toggle', (ids, state) => {
    return useTRPC().multi.toggleMany.mutate([ids, state]);
  });
});

const { data, pending, refresh } = useTRPC().multi.getAll.useQuery();
usePageStore().setPageValues({ refresh });
</script>

<template>
  <AppStructure name="multi" :data="data" :loading="pending" />
</template>
