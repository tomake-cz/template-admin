<script setup lang="ts">
const props = defineProps<{
  revisions?: Revisions | null;
}>();

const { icon, text, dropdownIcon } = toRefs(useAppStore().revisionHistory);

const activeRevision = ref(props.revisions?.active);

const onClick = (close: () => void, revision: Revision) => {
  activeRevision.value = revision;
  useInputStore().applyRevision(revision);
  close();
};
</script>

<template>
  <AppDropdown :pos="{ top: 52, right: 0 }">
    <template #button="{ open }">
      <div
        class="flex items-center whitespace-nowrap rounded-full bg-gray-dark px-6 py-3"
      >
        <AppIcon :icon="icon" size="lg" />
        <span class="ml-3 mr-6 flex gap-2">
          <span class="text-xs">{{ text }}</span>
          <span class="text-xs">{{ activeRevision?.dateCreated }}</span>
        </span>
        <AppIcon
          :icon="dropdownIcon"
          size="lg"
          :class="{ 'rotate-45': open }"
          class="icon-site-2 transition-all"
        />
      </div>
    </template>
    <template #popup="{ close }">
      <div
        class="flex flex-col gap-4 rounded-[12px] bg-black-light px-4 py-2 text-gray-lighter"
      >
        <template v-for="(revision, i) in revisions?.all" :key="i">
          <button
            class="flex flex-col hover:underline"
            @click="onClick(close, revision)"
          >
            <h6>{{ revision.revisionName }}</h6>
            <span>
              {{ revision.dateCreated }}
              <!-- {{ revision.user }} -->
            </span>
          </button>
        </template>
      </div>
    </template>
  </AppDropdown>
</template>
