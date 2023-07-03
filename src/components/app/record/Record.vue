<script setup lang="ts">
const props = defineProps<{
  data?: AppRecord | null;
  loading: boolean;
  title?: string;
  revisions?: Revisions | null;
  controls?: ControlPanelControls;
}>();

const { setPageValues } = usePageStore();
setPageValues({
  type: 'record',
  inputs: {
    info: new InputMap(),
    cached: new InputMap(),
    stored: new InputMap(),
  },
});

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
  () => props.title,
  (title) => {
    if (!title) return;
    setPageValues({ title });
    theTitle.value = title;
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
  <div class="flex h-full w-full justify-between">
    <InnerNav />
    <div class="w-[calc(100%-31rem)] px-6 py-12">
      <div class="mb-12 flex items-center gap-8">
        <h1 class="text-3xl">{{ theTitle }}</h1>
        <RevisionHistory :revisions="revisions" />
      </div>
      <div
        :id="useHyphenPath()"
        class="relative flex min-h-full flex-col gap-6"
      >
        <client-only>
          <slot />
        </client-only>
      </div>
    </div>
    <ControlPanel :data="data" :controls="controls" />
    <!-- <client-only>
      <AppLoadingPage v-if="loading" />
    </client-only> -->
  </div>
</template>
