<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/capi';

const props = defineProps<{
  item: AppStructure;
  checked: boolean;
}>();

const { state } = toRefs(useAppStore().translatedValues);
const { keys } = toRefs(useViewStore().view);

const parse = (key: string, val: InputValue | Group) => {
  const type = keys.value.get(key)?.type;
  if (!type) return val;

  switch (type) {
    case 'date':
      return new Date(val as string).toLocaleDateString();
    case 'boolean':
      return (val as boolean) ? state.value.true : state.value.false;
    default:
      return val;
  }
};

const { getEnabledViewKeys } = useViewStore();

const entries = computed(() => {
  const keys = getEnabledViewKeys().map((k) => k.name);
  return Object.entries(props.item)
    .filter(([k]) => keys.includes(k))
    .map(([k, v]) => [k, parse(k, v)] as const);
});

const { openBtn } = toRefs(useAppStore().structure);
const isHovering = ref(false);

const checkedCount = inject('checkedCount') as Ref<number>;
</script>

<template>
  <tr @mouseover="isHovering = true" @mouseout="isHovering = false">
    <td>
      <InputCheckbox
        :name="item.id.toString()"
        :checked="checked"
        size="md"
        styling="transparent"
        @toggle="(e) => (e ? checkedCount++ : checkedCount--)"
      />
    </td>
    <template v-for="([key, val], i) in entries" :key="i">
      <td>
        <span class="flex items-center justify-between gap-4">
          <span>{{ val }}</span>
          <NuxtLink
            v-if="key === 'title'"
            :to="`${useRoute().path}/${item.id}`"
            :class="{
              'pointer-events-none bg-transparent text-transparent':
                !isHovering,
            }"
            class="rounded-[12px] bg-gray-dark px-2 py-1 text-xs text-black-light"
          >
            {{ openBtn }}
          </NuxtLink>
        </span>
      </td>
    </template>
  </tr>
</template>
