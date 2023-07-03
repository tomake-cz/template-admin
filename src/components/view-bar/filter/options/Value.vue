<script setup lang="ts">
const props = defineProps<{
  title: string;
  filter: View['filters'][0];
}>();

const { filterConstraints, getFilterConstraint } = storeToRefs(useAppStore());
const { filter: appFilter } = toRefs(useAppStore().views.controls);
const { upsertViewFilter, removeViewFilter } = useViewStore();

const input = ref<HTMLInputElement>();

type FilterConstraintTranslated = {
  name: FilterConstraint;
  translated: string;
};
const constraint = ref<FilterConstraintTranslated>({
  name: props.filter.constraint,
  translated:
    getFilterConstraint.value(props.filter)?.translated ??
    'nieco sa nepodarilo',
});
const onSelect = (c: FilterConstraintTranslated) => {
  constraint.value = c;

  setFilter();
};

const setFilter = () => {
  upsertViewFilter({
    id: props.filter.id,
    key: props.filter.key,
    type: 'string',
    constraint: constraint.value.name,
    value: input.value?.value ?? '',
  });
};

onBeforeUnmount(() => {
  setFilter();
});

const removeFilter = (id: string) => {
  removeViewFilter(id);
  useActionStore().runDeferred('deleteFilters');
};
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <div class="flex justify-between">
      <div class="flex gap-1">
        <span class="whitespace-nowrap text-xs font-normal text-gray-lighter">{{
          title
        }}</span>
        <InputListBox
          :initial="getFilterConstraint(filter)?.translated ?? 'nic'"
          :options="
            filterConstraints.map((fc) => ({
              name: fc.constraint,
              translated: fc.translated,
            }))
          "
          @select="onSelect($event as FilterConstraintTranslated)"
        />
      </div>
      <div>
        <AppDropdown :pos="{ top: 0, left: 24 }">
          <template #button>
            <span class="rotate-180 text-gray-lighter">...</span>
          </template>
          <template #popup>
            <div class="p-2">
              <button
                class="whitespace-nowrap text-xs font-normal text-site-1"
                @click="removeFilter(filter.id)"
              >
                {{ appFilter.remove }}
              </button>
            </div>
          </template>
        </AppDropdown>
      </div>
    </div>
    <input
      ref="input"
      type="text"
      :value="filter.value"
      class="rounded-md border border-gray-darker bg-gray-light p-2 text-xs font-normal text-gray-darker"
      @input="setFilter"
    />
  </div>
</template>
