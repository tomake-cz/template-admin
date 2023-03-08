<script setup lang="ts"></script>

<template>
  <div class="flex h-full justify-between">
    <AppNav />
    <div class="grow py-12 px-6">
      <div class="mb-12">
        <h1 class="text-3xl">Hlavička</h1>
        <AppRevisionHistory />
      </div>
      <div class="flex flex-col gap-6">
        <slot />
      </div>
    </div>
    <AppControlPanel />
  </div>
</template>
