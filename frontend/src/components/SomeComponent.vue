<script setup lang="ts">
const count = ref(0);
const increment = () => count.value++;
</script>
<template>
  <div class="m-10 flex flex-col items-center">
    <h1 class="text-xl">{{ count }}</h1>
    <button class="m-5 rounded-full bg-blue-600 p-5 text-lg" @click="increment">
      Click me!👆
    </button>
  </div>
</template>
