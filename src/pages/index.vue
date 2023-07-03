<script setup lang="ts">
const links = [
  {
    name: 'Go to mutations page',
    url: '/webove-zaznamy/hlavni-strana/mutace',
  },
  {
    name: 'Go to structure page',
    url: '/webove-zaznamy/hlavni-strana/multi',
  },
  {
    name: 'Go to assets page',
    url: '/assets',
  },
];

const items = ref([
  {
    id: 1,
    listId: 1,
    foo: 'bar',
  },
  {
    id: 2,
    listId: 1,
    fiz: 'baz',
  },
  {
    id: 3,
    listId: 3,
    bomba: 'super',
  },
  {
    id: 4,
    listId: 2,
    jsem: 'nejlepsi',
  },
  {
    id: 5,
    listId: 3,
    asd: 'asd',
  },
]);
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center bg-gray-500 text-gray-100"
  >
    <div class="flex gap-10">
      <AppDragDropZone :id="1" v-slot="{ item }" :items="items">
        <div class="m-2 bg-red-500 p-1 text-white">
          {{ item }}
        </div>
      </AppDragDropZone>
      <AppDragDropZone :id="2" v-slot="{ item }" :items="items">
        <div class="m-2 bg-red-500 p-1 text-white">
          {{ item }}
        </div>
      </AppDragDropZone>
      <AppDragDropZone :id="3" v-slot="{ item }" :items="items">
        <div class="m-2 bg-red-500 p-1 text-white">
          {{ item }}
        </div>
      </AppDragDropZone>
    </div>
    <button @click="items[0].listId = 2">asd</button>
    <h1 class="m-5 mb-12 text-5xl">Welcome to TOMAKER</h1>
    <template v-for="{ name, url } in links" :key="name">
      <NuxtLink
        :to="url"
        class="text-xl font-medium underline hover:text-blue-300"
      >
        {{ name }}
      </NuxtLink>
    </template>
  </div>
</template>
