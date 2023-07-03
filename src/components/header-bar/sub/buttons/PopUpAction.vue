<script setup lang="ts">
const props = defineProps<{
  isLast: boolean;
  action: {
    id: number;
    name: string;
    text: string;
    shortcut: string;
    confirmation: boolean;
  };
}>();
const { name } = toRefs(props.action);

const emits = defineEmits(['close']);

const click = () => {
  useActionStore().run(name.value);
  emits('close');
};
</script>

<template>
  <button
    :class="{
      'rounded-b-xl border-t-2 border-solid border-gray-lighter': isLast,
    }"
    class="group flex h-[46px] items-center justify-between px-4 text-xs first:rounded-xl"
    @click="click"
  >
    <span
      :class="[isLast ? 'text-site-1' : 'text-gray-lighter']"
      class="group-hover:underline"
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
