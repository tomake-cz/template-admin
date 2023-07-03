<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/capi';

const props = defineProps<{
  data: AppStructure[] | null;
}>();

const { sortValues } = useViewStore();
const sortedKeyResult = computed(() => {
  return props.data?.map((o) => sortValues(o) as AppStructure);
});

const items = computed(() => {
  const { view } = toReactive(useViewStore());
  const { getSortKeyType } = useViewStore();

  const m = sortedKeyResult.value ?? [];
  let sorted = m.sort((a, b) => {
    const sort = view.sortName;
    const key = getSortKeyType(sort);

    if (!key) {
      return 0;
    }

    const { type } = key;

    if (type === 'string') {
      return (a[sort] as string).localeCompare(b[sort] as string);
    }
    if (type === 'number') {
      return (a[sort] as number) - (b[sort] as number);
    }
    if (type === 'date') {
      return (
        new Date(a[sort] as string).getTime() -
        new Date(b[sort] as string).getTime()
      );
    }
    return 0;
  });

  if (view.sortDir === 'desc') {
    sorted = sorted.reverse();
  }

  const { getFilterConstraint } = storeToRefs(useAppStore());
  view.filters.forEach((filter) => {
    if (filter.type === 'none') return;

    sorted = sorted.filter((item) => {
      const fc = getFilterConstraint.value(filter);
      if (!fc) return true;

      // if (typeof item[filter.key] === 'object') return false;
      const key = item[filter.key];
      if (typeof key !== 'string') return false;

      return fc.check(key, filter.value);
    });
  });

  return sorted;
});

const globalChecked = ref(false);
const checkedCount = inject('checkedCount') as Ref<number>;
watch(globalChecked, (val) => {
  checkedCount.value = val ? items.value.length : 0;
});
</script>

<template>
  <client-only>
    <table
      class="relative block table-fixed border-collapse overflow-x-auto whitespace-nowrap"
    >
      <tbody
        :id="useHyphenPath()"
        :key="useViewStore().getEnabledViewKeys()?.[0]?.type"
        class="table w-full"
      >
        <AppStructureMainHeader @toggle="globalChecked = $event" />
        <template v-for="item in items" :key="item.id">
          <AppStructureMainItem :item="item" :checked="globalChecked" />
        </template>
      </tbody>
    </table>
  </client-only>
</template>

<style scoped>
:deep(tr) {
  @apply h-20 w-full bg-gray-dark hover:bg-gray-darker;
}
:deep(tr):first-child {
  @apply h-8 bg-white;
}
:deep(tr):not(tr:nth-child(1)):hover label {
  @apply border-white;
}

:deep(td) {
  @apply w-auto px-6 text-sm text-black-light;
}
:deep(tr):first-child td {
  @apply text-base;
}
:deep(tr):not(tr:first-child) td {
  @apply bg-gray-dark;
}
:deep(tr):not(tr:first-child):hover td {
  @apply bg-gray-darker;
}
:deep(tr):nth-child(2) td:first-child {
  @apply rounded-tl-[12px];
}
/* :deep(tr):nth-child(2) td:last-child {
  @apply rounded-tr-[12px];
} */
:deep(tr):last-child td:first-child {
  @apply rounded-bl-[12px];
}
/* :deep(tr):last-child td:last-child {
  @apply rounded-br-[12px];
} */
</style>
