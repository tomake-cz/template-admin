<script setup lang="ts">
const props = defineProps<{
  group: {
    title: string;
    links: {
      id: number;
      title: string;
      url: string;
    }[];
  };
}>();
const { title, links } = toRefs(props.group);
</script>

<template>
  <div class="mb-12">
    <h3 class="mb-6 uppercase text-black-light">{{ title }}</h3>
    <div class="flex flex-col">
      <template v-for="link in links" :key="link.id">
        <InnerNavLink :link="link" class="mb-4" />
      </template>
    </div>
  </div>
</template>
