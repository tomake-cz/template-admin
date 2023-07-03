<script setup lang="ts">
const props = defineProps<{
  notification: {
    id: string;
    type: string;
    message: string;
    icon: {
      url: string;
      alt: string;
    };
  };
}>();
const { id, message, icon } = toRefs(props.notification);

const { icon: closeIcon } = toRefs(
  storeToRefs(useAppStore()).notifications.value,
);

const { remove } = useNotificationStore();
const close = () => {
  remove(id.value);
};
</script>

<template>
  <div class="flex items-center justify-between rounded-[12px] bg-black-light">
    <div class="flex items-center gap-2 py-4 pl-4">
      <AppIcon :icon="icon" size="lg" />
      <span class="text-xs text-gray-lighter">{{ message }}</span>
    </div>
    <button class="p-4" @click="close">
      <AppIcon :icon="closeIcon" size="sm" class="icon-gray-lighter" />
    </button>
  </div>
</template>
