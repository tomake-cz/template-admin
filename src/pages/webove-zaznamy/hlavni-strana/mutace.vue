<script setup lang="ts">
const { data, pending } = useCachedTRPC((t) => t.single.get.useQuery());

const { data: revisions } = useTRPC().single.getRevisions.useQuery();

useUploadStore().set<typeof data.value>(({ values, globals }) => {
  return useTRPC().single.update.mutate([
    0,
    globals,
    {
      name: values.name,
      email: values.email,
      number: values.number,
      persons: values.persons,
      image: values.image,
      images: values.images,
    },
  ]);
});
</script>

<template>
  <AppRecord :data="data" :loading="pending" :revisions="revisions">
    <client-only>
      <AppInputTextTitle
        id="name"
        label="Jméno"
        :value="data?.name"
        :max-length="30"
        required
      />
      <AppInputTextEmail
        id="email"
        label="Email"
        info="Zadejte váš email"
        :value="data?.email"
        :max-length="30"
      />
      <AppInputNumber
        id="number"
        label="Číslo"
        :value="data?.number"
        :max-length="10"
      />
      <AppInputAsset id="image" label="Obrázek" :value="data?.image" />
      <AppInputAsset
        id="images"
        label="Obrázky"
        :value="data?.images"
        multiple
      />
      <AppInputGroup
        id="persons"
        v-slot="{ id, item }"
        label="Kontaktní osoby"
        :loading="pending"
        :value="data?.persons"
        :default="{
          id: -1,
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
        }"
      >
        <AppInputText
          :id="id('firstname')"
          label="Jméno"
          :value="item.firstname"
          :max-length="30"
        />
        <AppInputText
          :id="id('lastname')"
          label="Příjmení"
          :value="item.lastname"
          :max-length="30"
        />
        <AppInputText
          :id="id('email')"
          label="Email"
          :value="item.email"
          :max-length="30"
        />
        <AppInputText
          :id="id('phone')"
          label="Tel. číslo"
          :value="item.phone"
          :max-length="30"
        />
      </AppInputGroup>
    </client-only>
  </AppRecord>
</template>
