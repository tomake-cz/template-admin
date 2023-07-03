<script setup lang="ts">
import { InputProps } from '~/types/input';

interface Props extends InputProps<Asset | Asset[]> {
  idealWidth?: number;
  idealHeight?: number;
  formats?: string[];
  bestFormats?: string[];
  multiple?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  idealWidth: 1920,
  idealHeight: 1080,
  formats: () => ['JPG', 'PNG'],
  bestFormats: () => ['WEBP', 'AVIF'],
});

const type = computed(() => (props.multiple ? 'assets' : 'asset'));

const { setCachedInput, getCachedInputs } = useInputStore();

watch(
  () => props.value,
  (val) => {
    if (!val) return;
    if (!Array.isArray(val)) {
      setCachedInput({
        name: useAssetId(props.id),
        value: val,
        required: props.required ?? false,
        type: type.value,
      });
      return;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        setCachedInput({
          name: useAssetId(props.id),
          value: undefined,
          required: props.required ?? false,
          type: type.value,
        });
      }
      val.forEach((asset) => {
        setCachedInput({
          name: useAssetId(props.id),
          value: asset,
          required: props.required ?? false,
          type: type.value,
        });
      });
    }
  },
  { immediate: true },
);

const isAnyCachedFileUndefined = (name: string) => {
  return getCachedInputs()
    .getAssets(name)
    .some(([, file]) => file === undefined);
};

const add = () => {
  if (isAnyCachedFileUndefined(props.id)) return;
  setCachedInput({
    name: useAssetId(props.id),
    value: undefined,
    required: props.required ?? false,
    type: type.value,
  });
};

const defaultId = useAssetId(props.id);
const files = computed(() => {
  const cached = getCachedInputs().getAssets(props.id);
  if (cached.length === 0)
    return [[defaultId, undefined]] as [string, undefined][];
  return cached;
});
</script>

<template>
  <AppInput
    :id="id"
    :label="label"
    :info="info"
    :required="required"
    :type="type"
  >
    <div class="flex flex-col gap-2">
      <client-only>
        <template v-for="(file, i) in files" :key="i">
          <AppInputAssetInput
            :id="file[0]"
            :value="file[1]?.value"
            :required="required ?? false"
            :ideal-width="idealWidth"
            :ideal-height="idealHeight"
            :formats="formats"
            :best-formats="bestFormats"
            :multiple="(multiple ?? false) && files.length > 1"
          />
        </template>
      </client-only>
      <AppInputGroupAdd v-if="multiple" class="mt-2" @click="add" />
    </div>
  </AppInput>
</template>
