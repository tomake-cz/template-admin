<script setup lang="ts">
const id = isNaN(Number(useRoute().params.record))
  ? -1
  : Number(useRoute().params.record);
const { data, pending } = useCachedTRPC(
  (t) => t.multi.getOne.useQuery(id),
  id === undefined,
);

useUploadStore().set<typeof data.value>(({ values, globals }) => {
  return useTRPC().multi.upsert.mutate([
    {
      ...globals,
      id,
    },
    {
      ...globals,
      title: values.title,
      description: values.description,
    },
  ]);
});
</script>

<template>
  <AppRecord :data="data" :title="data?.title" :loading="pending">
    <AppInputText
      id="title"
      label="Nadpis"
      :value="data?.title"
      :max-length="25"
    />
    <AppInputText
      id="description"
      label="Text"
      :value="data?.description"
      :max-length="80"
    />
  </AppRecord>
</template>
