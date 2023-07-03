<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 z-50 h-screen w-screen">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div
          class="h-32 w-32 animate-spin rounded-full border-y-2 border-gray-900"
        ></div>
        <div class="text-2xl text-gray-900">Loading...</div>
      </div>
    </div>
  </div>
</template>
