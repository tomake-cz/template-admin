<script setup lang="ts">
import AppDropdown from '@/components/app/dropdown/Dropdown.vue';

const { dropdownIcon } = toRefs(useAppStore().views);
const { sort } = toRefs(useAppStore().views.controls);

const { view } = storeToRefs(useViewStore());
const { getViewKey, setView } = useViewStore();

const title = computed(() => getViewKey(view.value.sortName)?.translated ?? '');

const setSortName = (name: string) => {
  setView({ sortName: name });
};

const { sortDirs } = storeToRefs(useAppStore());
const setSortDir = (dir: string) => {
  setView({ sortDir: dir as 'asc' | 'desc' });
};

const dropdown = ref<InstanceType<typeof AppDropdown>>();
</script>

<template>
  <AppDropdown ref="dropdown" :pos="{ top: 40, left: 0 }">
    <template #button>
      <ViewBarBottomButton
        :open="dropdown?.open ?? false"
        :icon="sort[view.sortDir].icon"
      >
        {{ title }}
      </ViewBarBottomButton>
    </template>
    <template #popup>
      <ViewBarSortOptionsPopUp :add="sort.add" :remove-all="sort.removeAll">
        <div class="flex items-center gap-2">
          <InputCombobox
            :initial="getViewKey(view.sortName)?.translated"
            :options="[...view.keys.entries()].map(([, v]) => v)"
            :dropdown-icon="dropdownIcon"
            @select="setSortName"
          />
          <InputCombobox
            :initial="sortDirs.get(view.sortDir)"
            :options="
              [...sortDirs].map(([k, v]) => ({ name: k, translated: v }))
            "
            :dropdown-icon="dropdownIcon"
            @select="setSortDir"
          />
        </div>
      </ViewBarSortOptionsPopUp>
    </template>
  </AppDropdown>
</template>
