<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  action: (key: Key) => void;
  placeholder: string;
  checkbox?: boolean;
  disabledKeys: string[];
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const runAction = (key: Key) => {
  props.action(key);
  if (props.open) emit('close');
};

const index = ref(-1);
onKeyStroke('Enter', (e) => {
  e.preventDefault();
  if (index.value === -1 || index.value > keys.value.length - 1) return;
  if (props.disabledKeys.includes(keys.value[index.value][0])) return;

  runAction(keys.value[index.value][1]);
  if (props.open) emit('close');
  keyword.value = '';
  index.value = -1;
});
onKeyStroke('ArrowDown', (e) => {
  e.preventDefault();
  if (index.value < keys.value.length - 1) index.value++;
});
onKeyStroke('ArrowUp', (e) => {
  e.preventDefault();
  if (index.value > 0) index.value--;
});
const isMouseOver = ref(false);

const { view } = storeToRefs(useViewStore());
const keyword = ref('');
const pageKeys = computed(() => view.value.keys);
const keys = useFilterKeysByKeyword(keyword, pageKeys);
</script>

<template>
  <div class="p-2">
    <ViewBarKeySelectInput
      v-model="keyword"
      :placeholder="placeholder"
      focus
      class="mb-2"
    />
    <div class="flex flex-col items-start">
      <template v-for="([, key], i) in keys" :key="key.name">
        <template v-if="!checkbox">
          <button
            :class="{ 'bg-black-dark': index === i && !isMouseOver }"
            class="w-full rounded-md px-4 py-2 text-left text-xs font-normal text-gray-lighter hover:bg-black-dark"
            @click="runAction(key)"
            @mouseover="index = i"
            @mouseleave="index = -1"
          >
            {{ key.translated }}
          </button>
        </template>
        <template v-else>
          <label
            :class="{ 'bg-black-dark': index === i && !isMouseOver }"
            class="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-black-dark"
            @mouseover="index = i"
            @mouseleave="index = -1"
          >
            <InputCheckbox
              size="sm"
              :checked="key.enabled"
              styling="white"
              :disabled="disabledKeys.includes(key.name)"
              @toggle="runAction(key)"
            />
            <span class="text-xs font-normal text-gray-lighter">{{
              key.translated
            }}</span>
          </label>
        </template>
      </template>
    </div>
  </div>
</template>
