<script setup lang="ts">
import { defaultView } from '~~/src/stores/ViewStore';

const props = defineProps<{
  name: string;
  data: AppStructure[] | null;
  loading: boolean;
}>();

const { getTranslatedKey } = storeToRefs(useAppStore());
const { setViews, activateView } = useViewStore();
const res = useTRPC().view.getViews.useQuery(props.name);
const hasViews = ref(true);
onMounted(() => {
  res.then(({ data }) => {
    if (!data.value || data.value.length === 0) {
      hasViews.value = false;
      return;
    }

    setViews(
      data.value.map((v) => ({
        ...v,
        dateCreated: new Date(v.dateCreated),
        dateUpdated: new Date(v.dateUpdated),
        sortDir: v.sortDir as SortDir,
        filters: v.filters.map((f) => ({
          ...f,
          constraint: f.constraint as FilterConstraint,
          type: f.type as FilterType,
          value: f.value ?? '',
        })),
        keys: v.keys.map((k) => ({
          ...k,
          translated: getTranslatedKey.value(k.name),
        })),
      })),
    );
    activateView(defaultView.name);
  });
});

const { setPageValues } = usePageStore();
setPageValues({ type: 'structure', model: props.name });

const { setKeysOnAllPageViews } = useViewStore();
watch(
  () => props.data,
  (val) => {
    if (!val) return;
    setPageValues({ keys: new Map(useExtractKeys(val[0]) as []) });
    setKeysOnAllPageViews();
    if (!hasViews.value) {
      activateView(defaultView.name);
    }
  },
  {
    immediate: true,
  },
);

const checkedCount = ref(0);
provide('checkedCount', checkedCount);
</script>

<template>
  <div class="flex h-full">
    <InnerNav />
    <div class="w-0 grow">
      <ViewBar />
      <div class="pb-12 pl-6 pt-8">
        <div class="mb-5 flex items-center gap-4">
          <AppStructureTitle />
          <AppStructureProperties />
        </div>
        <AppStructureMain :data="data">
          <slot />
        </AppStructureMain>
      </div>
    </div>
    <!-- <client-only>
      <AppLoadingPage v-if="loading" />
    </client-only> -->
  </div>
</template>
