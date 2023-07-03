<script setup lang="ts">
import AppDropdown from '@/components/app/dropdown/Dropdown.vue';

const { dropdownIcon } = toRefs(useAppStore().views);
const { icon, actions } = toRefs(useAppStore().views.options.settings);

const dropdown = ref<InstanceType<typeof AppDropdown>>();

const runAction = (name: string) => {
  useActionStore().run(name);
  if (dropdown.value) {
    dropdown.value.open = false;
  }
};
</script>

<template>
  <AppDropdown ref="dropdown">
    <template #button>
      <div class="flex items-center gap-1">
        <AppIcon :icon="icon" size="md" />
        <AppIcon
          :icon="dropdownIcon"
          size="sm"
          :class="{ 'rotate-45': dropdown?.open ?? false }"
          class="icon-site-2 transition-all"
        />
      </div>
    </template>
    <template #popup>
      <div class="p-2">
        <template v-for="action in actions" :key="action.id">
          <button
            :class="[
              action.name.includes('delete')
                ? 'text-site-1'
                : 'text-gray-lighter',
            ]"
            class="w-full rounded-md px-4 py-2 text-left text-xs font-normal hover:bg-black-dark hover:underline"
            @click="runAction(action.name)"
          >
            {{ action.text }}
          </button>
        </template>
      </div>
    </template>
  </AppDropdown>
</template>
