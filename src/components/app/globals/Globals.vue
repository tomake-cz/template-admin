<script setup lang="ts">
withDefaults(
  defineProps<{
    loading: boolean;
    title?: string;
  }>(),
  {
    title: 'Globalní sady',
  },
);

const { setPageValues } = usePageStore();
setPageValues({ type: 'record' });

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
        <h1 class="text-3xl">{{ title }}</h1>
        <RevisionHistory />
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
    <!-- <ControlPanel :data="data" /> -->
    <!-- <client-only>
      <AppLoadingPage v-if="loading" />
    </client-only> -->
  </div>
</template>
