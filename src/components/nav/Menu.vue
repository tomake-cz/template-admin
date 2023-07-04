<script setup lang="ts">
const { nav } = storeToRefs(useAppStore());
</script>

<template>
  <div id="nav-menu" class="w-[240px] bg-black-light">
    <div class="fixed flex w-[240px] flex-col items-center p-6">
      <NuxtLink to="/">
        <NavLogo class="mb-6" />
      </NuxtLink>
      <div>
        <SearchBar class="mb-6" />
        <template v-for="(group, i) in nav" :key="i">
          <NavGroup :group="group" />
        </template>
      </div>
    </div>
  </div>
</template>
