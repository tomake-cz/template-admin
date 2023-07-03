<script setup lang="ts">
const { isNavFixed } = storeToRefs(useAppStore());
const { setIsNavFixed } = useAppStore();
const target = ref<HTMLElement>();

useIntersectionObserver(
  target,
  ([target]) => {
    setIsNavFixed(!target.isIntersecting);
  },
  { threshold: 1 },
);

const width = ref(0);
useWindowWidthWatcher((windowWidth) => {
  const nav = document.querySelector('#nav-menu');
  if (!nav) {
    return;
  }

  const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
  width.value = windowWidth - nav.clientWidth - scrollbarWidth;
});
</script>

<template>
  <div ref="target" class="relative h-12 w-full">
    <div
      :style="`width: ${width ? `${width}px` : '100%'};`"
      :class="[isNavFixed ? 'fixed top-0 z-10' : 'absolute']"
      class="flex h-12 items-center justify-between bg-gray-darker px-6"
    >
      <HeaderBarSubBreadCrumbs />
      <HeaderBarSubButtons />
    </div>
  </div>
</template>
