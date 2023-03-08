<script setup lang="ts">
const groups: {
  id: number;
  title: string;
  links: {
    id: number;
    title: string;
    url: string;
  }[];
}[] = [
  {
    id: 0,
    title: 'Hlavní strana',
    links: [
      {
        id: 0,
        title: 'Hlavička',
        url: '',
      },
      {
        id: 1,
        title: 'Proč FVE od nás?',
        url: '',
      },
    ],
  },
  {
    id: 1,
    title: 'Portfolio',
    links: [
      {
        id: 0,
        title: 'Hlavička',
        url: '',
      },
      {
        id: 1,
        title: 'Galerie',
        url: '',
      },
    ],
  },
];
</script>

<template>
  <nav class="h-full w-60 bg-gray-dark px-6 py-12">
    <template v-for="group in groups" :key="group.id + group.title">
      <AppNavGroup :group="group" />
    </template>
  </nav>
</template>
