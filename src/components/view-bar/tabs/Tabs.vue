<script setup lang="ts">
const { activateView } = useViewStore();
const { view: storeView } = storeToRefs(useViewStore());

const { activateClickedView } = useViewStore();
const isMenuOpen = ref(false);
const pos = reactive({ top: 0, left: 0 });
const onContextmenu = (e: MouseEvent, name: string) => {
  e.preventDefault();
  activateClickedView(name);
  isMenuOpen.value = true;
  pos.top = e.clientY;
  pos.left = e.clientX;
};

const { getPage } = usePageStore();
const views = computed(() => {
  return [...(getPage()?.views.values() ?? [])].sort((a, b) => {
    if (!a.dateCreated || !b.dateCreated) return 0;
    return a.dateCreated.getTime() - b.dateCreated.getTime();
  });
});
</script>

<template>
  <div class="flex items-center">
    <client-only>
      <template v-for="view in views" :key="view.id">
        <ViewBarTabsTab
          :active="storeView.name === view.name"
          @click="activateView(view.name)"
          @contextmenu="(e) => onContextmenu(e, view.name)"
        >
          {{ view.name }}
        </ViewBarTabsTab>
      </template>
    </client-only>
    <ViewBarTabsAdd />
    <ViewBarTabsContextMenu
      :open="isMenuOpen"
      :pos="pos"
      @close="isMenuOpen = false"
    />
  </div>
</template>
