<script setup lang="ts"></script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center bg-gray-500 text-gray-100"
  >
    <h1 class="m-5 text-5xl">Hello, you are on index</h1>
    <p class="m-5 text-4xl">This page renders content of component:</p>
    <NuxtLink
      to="/webove-zaznamy/hlavni-strana/mutace"
      class="text-xl font-medium underline hover:text-blue-300"
    >
      Go to mutations page
    </NuxtLink>
  </div>
</template>
