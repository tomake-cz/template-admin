<script setup lang="ts">
const props = defineProps<{
  group: {
    title: string;
    links: {
      title: string;
      url: string;
      icon: {
        url: string;
        alt: string;
      };
    }[];
  };
}>();

const { title, links } = toRefs(props.group);
</script>

<template>
  <div>
    <h2 v-if="title" class="mb-6 text-gray-lighter">{{ title }}</h2>
    <template v-for="(link, i) in links" :key="i">
      <NavLink :link="link" class="last:mb-12" />
    </template>
  </div>
</template>
