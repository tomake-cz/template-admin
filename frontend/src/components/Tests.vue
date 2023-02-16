<script setup lang="ts">
interface Props {
  tests: { id: string; name: string; email: string }[];
}
defineProps<Props>();
</script>

<template>
  <div>
    <h1>Tests</h1>
    <ul>
      <li v-for="test in tests" :key="test.id">
        {{ test.name }} - {{ test.email }}
      </li>
    </ul>
  </div>
</template>
