<script setup lang="ts">
const param = useRoute().params.record;
const id = parseInt(typeof param === 'string' ? param : param[0]);
const { data, pending } = await useTRPC().asset.getOne.useQuery(id);

useUploadStore().set<typeof data.value>(({ values }) => {
  return useTRPC().asset.upsertOne.mutate({
    id,
    title: values.title,
  });
});
</script>

<template>
  <AppAsset :title="data?.title" :data="data" :loading="pending">
    <AppInputText id="title" label="Název obrázku" :value="data?.title" />
    <!-- <AppInputAsset
      id="image-input"
      label="Obrázek"
      :ideal-width="700"
      :ideal-height="300"
    /> -->
    <AppAssetImage
      id="image"
      label="Obrázek"
      :src="data?.url"
      :alt="data?.title ?? 'image'"
    />
  </AppAsset>
</template>
