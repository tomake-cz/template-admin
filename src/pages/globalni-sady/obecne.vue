<script setup lang="ts"></script>

<template>
  <AppRecord :loading="false">
    <AppInputTextEmail
      id="email"
      label="Email"
      value="tomaker@tomake.cz"
      required
    />
  </AppRecord>
</template>
