<script setup lang="ts">
import AppDropdown from '@/components/app/dropdown/Dropdown.vue';

const props = defineProps<{
  action: (key: Key) => void;
  icon: {
    url: string;
    alt: string;
  };
  placeholder: string;
  left?: boolean;
  checkbox?: boolean;
  disabledKeys?: string[];
}>();

const pos = computed(() => ({
  top: 28,
  left: props.left ? 0 : undefined,
  right: props.left ? undefined : 0,
}));

const { dropdownIcon } = toRefs(useAppStore().views);

const dropdown = ref<InstanceType<typeof AppDropdown>>();
const close = () => {
  if (!dropdown.value) return;
  dropdown.value.open = false;
};
</script>

<template>
  <AppDropdown ref="dropdown" :pos="pos">
    <template #button>
      <div class="flex items-center gap-1">
        <AppIcon :icon="icon" size="md" />
        <slot name="button" />
        <AppIcon
          :icon="dropdownIcon"
          size="sm"
          :class="{ 'rotate-45': dropdown?.open }"
          class="icon-site-2 transition-all"
        />
      </div>
    </template>
    <template #popup>
      <ViewBarKeySelectPopUp
        :open="dropdown?.open ?? false"
        :action="action"
        :placeholder="placeholder"
        :checkbox="checkbox"
        :disabled-keys="disabledKeys ?? []"
        @close="close"
      />
    </template>
  </AppDropdown>
</template>
