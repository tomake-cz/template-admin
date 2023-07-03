<script setup lang="ts">
import AppDropdown from '@/components/app/dropdown/Dropdown.vue';

const props = defineProps<{
  filter: View['filters'][0];
  view: View;
}>();

const { filter: appFilter } = toRefs(useAppStore().views.controls);
const { getViewKey } = useViewStore();
const { getFilterConstraint } = storeToRefs(useAppStore());

const title = computed(() => getViewKey(props.filter.key)?.translated ?? '');

const dropdown = ref<InstanceType<typeof AppDropdown>>();
</script>

<template>
  <AppDropdown ref="dropdown" :pos="{ top: 40, left: 0 }">
    <template #button>
      <ViewBarBottomButton
        :open="dropdown?.open ?? false"
        :icon="appFilter.icon"
      >
        {{ title }}
        {{ getFilterConstraint(filter)?.translated ?? 'nic' }}
        "{{ filter.value }}"
      </ViewBarBottomButton>
    </template>
    <template #popup>
      <ViewBarFilterOptionsValue :title="title" :filter="filter" />
    </template>
  </AppDropdown>
</template>
