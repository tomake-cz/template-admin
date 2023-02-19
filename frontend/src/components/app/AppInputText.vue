<script setup lang="ts">
const props = defineProps<{
  text: string;
  value: string;
  name: string;
}>();
const { text, name } = toRefs(props);
</script>

<template>
  <div class="mb-2 flex flex-col">
    <label :for="name" class="mb-1 text-lg">{{ text }}</label>
    <input
      type="text"
      :name="name"
      :value="value"
      class="border border-black"
    />
  </div>
</template>
