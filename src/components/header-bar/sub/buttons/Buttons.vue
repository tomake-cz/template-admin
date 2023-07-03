<script setup lang="ts">
import AppDropdown from '@/components/app/dropdown/Dropdown.vue';

const { getHeaderButtonState } = storeToRefs(useAppStore());
const { dropdownIcon } = toRefs(storeToRefs(useAppStore()).headerButtons.value);
const { getPage } = usePageStore();

const type = computed(() => getPage()?.type ?? 'unknown');
const state = computed(() => getHeaderButtonState.value(type.value));

const dropdown = ref<InstanceType<typeof AppDropdown>>();
const close = () => {
  if (!dropdown.value) return;
  dropdown.value.open = false;
};
</script>

<template>
  <div class="relative flex gap-2 text-sm text-gray-lighter">
    <client-only>
      <HeaderBarSubButtonsButton
        :key="state.main.action.name"
        :action="state.main.action"
      />
    </client-only>
    <AppDropdown ref="dropdown" :pos="{ top: 48, right: 0 }">
      <template #button="{ open }">
        <div
          :class="[open ? 'bg-site-1' : 'bg-site-2 hover:bg-site-2-dark']"
          class="h-full w-full rounded-full p-3"
        >
          <AppIcon
            :icon="dropdownIcon"
            size="sm"
            :class="[open ? 'rotate-0' : '-rotate-45']"
            class="transition-all"
          />
        </div>
      </template>
      <template #popup>
        <div class="flex w-[332px] flex-col rounded-[12px] bg-black-light">
          <template
            v-for="(action, i) in state.options.actions"
            :key="action.id + action.name"
          >
            <HeaderBarSubButtonsPopUpAction
              :is-last="i === state.options.actions.length - 1"
              :action="action"
              @close="close"
            />
          </template>
        </div>
      </template>
    </AppDropdown>
  </div>
</template>
