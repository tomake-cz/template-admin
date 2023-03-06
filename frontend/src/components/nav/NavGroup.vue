<script setup lang="ts">
const props = defineProps<{
  group: {
    id: number;
    title: string;
    links: {
      id: number;
      title: string;
      url: string;
      icon: string;
    }[];
  };
}>();

const { title, links } = toRefs(props.group);
</script>

<template>
  <div>
    <h2 class="text-white">{{ title }}</h2>
    <template v-for="link in links" :key="link.id + link.title">
      <NavLink :link="link" />
    </template>
  </div>
</template>
