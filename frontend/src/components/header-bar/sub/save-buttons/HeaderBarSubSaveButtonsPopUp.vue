<script setup lang="ts">
const props = defineProps<{
  actions: {
    action: string;
    text: string;
    shortcut: string;
  }[];
}>();
const { actions } = toRefs(props);
</script>

<template>
  <div
    class="absolute top-10 right-0 flex w-[332px] flex-col rounded-xl bg-gray-light"
  >
    <template v-for="(action, i) in actions" :key="action.id + action.action">
      <button
        :class="{
          'rounded-b-xl border-t border-gray-darker': i + 1 === actions.length,
        }"
        class="flex h-[46px] items-center justify-between px-4 text-xs first:rounded-xl"
      >
        <span
          :class="[
            i + 1 === actions.length ? 'text-green-500' : 'text-black-light',
          ]"
        >
          {{ action.text }}
        </span>
        <span
          v-if="action.shortcut"
          class="rounded-xl bg-gray-darker p-2 text-gray-lighter"
        >
          {{ action.shortcut }}
        </span>
      </button>
    </template>
  </div>
</template>
