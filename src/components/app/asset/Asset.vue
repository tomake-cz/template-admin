<script setup lang="ts">
type Asset = NonNullable<AppRouterOutputs['asset']['getOne']>;

const props = defineProps<{
  data?: Asset | null;
  loading: boolean;
}>();

const { setPageValues } = usePageStore();
setPageValues({ type: 'record' });

const { translateURL } = storeToRefs(useAppStore());
const route = useRoute();
const path = ref(
  '/' +
    route.path
      .split('/')
      .filter((s) => s)
      .join('/'),
);

const theTitle = ref(translateURL.value(path.value));
watch(
  () => props.data,
  (res) => {
    if (!res) return;
    setPageValues({ id: res.id });
  },
  { immediate: true },
);
watch(
  () => props.data,
  (data) => {
    if (!data) return;
    setPageValues({ title: data.title });
    theTitle.value = data.title;
  },
  { immediate: true },
);

// shortcuts
onMounted(() => {
  const button = ref(
    document.querySelector(
      '#' + useHyphenPath() + '-header-main-button',
    ) as HTMLButtonElement,
  );

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's' && button.value) {
      e.preventDefault();
      button.value.click();
    }
  });
});
</script>

<template>
  <div class="flex h-full justify-between">
    <InnerNav />
    <div class="grow px-6 py-12">
      <div class="mb-12">
        <h1 class="text-3xl">{{ theTitle }}</h1>
        <RevisionHistory />
      </div>
      <div
        :id="useHyphenPath()"
        class="relative flex min-h-full flex-col gap-6"
      >
        <slot />
      </div>
    </div>
    <!-- <ControlPanel :data="data" /> -->
    <!-- <client-only>
      <AppLoadingPage v-if="loading" />
    </client-only> -->
  </div>
</template>
