<script setup lang="ts">
const { notifications } = storeToRefs(useNotificationStore());
</script>

<template>
  <div class="fixed bottom-5 right-[264px] flex w-[420px] flex-col gap-2">
    <TransitionGroup name="notification">
      <template v-for="notification in notifications" :key="notification.id">
        <Notification :notification="notification" />
      </template>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-enter-from {
  opacity: 0;
}
.notification-leave-from {
  opacity: 1;
}
.notification-enter-to {
  opacity: 1;
}
.notification-leave-to {
  opacity: 0;
}
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
</style>
