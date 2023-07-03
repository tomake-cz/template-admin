<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  src: string | undefined;
  alt: string;
}>();
</script>

<template>
  <AppInput :id="id" :label="label" type="asset">
    <div class="h-[600px] w-full rounded-[12px] border-4 border-gray-darker">
      <img
        :src="src"
        :alt="alt"
        class="h-full w-full rounded-lg object-cover object-center"
      />
    </div>
  </AppInput>
</template>
