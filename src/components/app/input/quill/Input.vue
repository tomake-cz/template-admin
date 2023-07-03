<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps<{
  value?: string | null;
  toolbar: ExtendedToolbar;
}>();

defineEmits<{
  (event: 'input', value: string): void;
}>();

const val = ref('');
watch(
  () => props.value,
  (v) => {
    if (!v) return;
    val.value = v;
  },
  { immediate: true },
);

const { colors, localisation } = toRefs(useAppStore().inputs.quill);
onMounted(() => {
  nextTick(() => {
    type LocalisationKey = keyof typeof localisation.value;

    const buttons = document.querySelectorAll(
      '.ql-toolbar span button, .ql-toolbar span span',
    );
    buttons.forEach((button) => {
      const classes = [...button.classList];
      const [name] = classes.map((c) => {
        const key = c.replace('ql-', '') as LocalisationKey;
        return localisation.value[key];
      });

      if (!name) return;
      button.setAttribute('title', name);
    });
  });
});

const TOOLBAR_PRESETS = new Map<ExtendedToolbar, ToolbarOptions>([
  [
    'title',
    ['bold', 'italic', 'underline', 'strike', 'link', { color: colors.value }],
  ],
]);
const tb = ref<Toolbar>(
  TOOLBAR_PRESETS.get(props.toolbar) ?? (props.toolbar as Toolbar),
);
</script>

<template>
  <div class="w-full bg-white text-black-light">
    <div>
      <client-only>
        <QuillEditor
          v-model:content="val"
          :toolbar="tb"
          theme="snow"
          content-type="html"
          @text-change="$emit('input', val)"
        />
      </client-only>
    </div>
  </div>
</template>

<style scoped>
:deep(.ql-editor) {
  @apply min-h-[0rem] p-3 text-sm;
}
:deep(.ql-toolbar.ql-snow) {
  @apply input rounded-b-none p-1;
}
:deep(.ql-container.ql-snow) {
  @apply input rounded-t-none p-0;
}
/* :deep(span.ql-formats button) {
  @apply h-2;
} */
/* :deep(.ql-toolbar .ql-stroke) {
  fill: none;
  stroke: #fff;
}

:deep(.ql-toolbar .ql-fill) {
  fill: #fff;
  stroke: none;
}

:deep(.ql-toolbar .ql-picker) {
  color: #fff;
} */
</style>
