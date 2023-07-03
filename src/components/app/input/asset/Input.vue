<script setup lang="ts">
interface Props {
  id: string;
  value?: Asset;
  required: boolean;
  idealWidth: number;
  idealHeight: number;
  formats: string[];
  bestFormats: string[];
  multiple: boolean;
}
const props = defineProps<Props>();

const { upload, remove, imagePlaceholder } = toRefs(useAppStore().inputs.asset);

const inp = ref<HTMLInputElement>();

const img = ref<Asset>();
watch(
  () => props.value,
  (val) => {
    img.value = val;
  },
  { immediate: true },
);

const readURL = async () => {
  if (!inp.value) return;

  await new Promise((resolve, reject) => {
    if (!inp.value?.files || !inp.value.files?.[0]) {
      reject(new Error('FileReader result is string'));
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', async (e) => {
      if (typeof e.target?.result === 'object') return;
      const inpFile = inp.value?.files?.[0];
      img.value = {
        id: undefined,
        url: e.target?.result ?? '',
        name: inpFile?.name ?? '',
        size: inpFile?.size ?? 0,
        type: inpFile?.type ?? '',
        extension: inpFile?.name?.split('.')?.pop()?.toUpperCase() ?? '',
        timestamp: null,
      };
      if (
        ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(
          img.value.extension.toLowerCase(),
        )
      ) {
        img.value.blurhash = await useBlurhash(e.target?.result ?? '');
      }
      resolve(undefined);
    });
    reader.readAsDataURL(inp.value.files[0]);
  });

  await new Promise((resolve, reject) => {
    if (!inp.value?.files || !inp.value.files?.[0]) {
      reject(new Error('FileReader result is string'));
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      if (
        typeof e.target?.result === 'string' ||
        !e.target?.result ||
        !img.value
      ) {
        throw new Error('FileReader result is string');
      }
      img.value.bytes = Buffer.from(e.target?.result).toJSON().data;
      resolve(undefined);
    });
    reader.readAsArrayBuffer(inp.value.files[0]);
  });
};
</script>

<template>
  <AppInputValue :id="id" :value="value" :required="required" type="asset">
    <template #default="{ updateCachedInput, removeCachedInput }">
      <div
        class="input flex w-full items-center justify-between border-dashed border-gray-dark bg-transparent"
      >
        <div class="flex items-center gap-4">
          <img
            :src="img?.url ?? useAsset(imagePlaceholder.url)"
            :alt="img?.name ?? imagePlaceholder.alt"
            class="h-16 w-16 rounded-[12px] object-contain"
          />
          <AppInputAssetInfo v-if="img" :asset="img" />
          <AppInputAssetPlaceholder
            v-else
            :ideal-width="idealWidth"
            :ideal-height="idealHeight"
            :formats="formats"
            :best-formats="bestFormats"
          />
        </div>
        <div class="flex items-center justify-center gap-4">
          <AppInputAssetButton
            v-if="img || multiple"
            tag="button"
            class="text-site-1"
            @click="
              removeCachedInput();
              img = undefined;
            "
          >
            {{ remove }}
          </AppInputAssetButton>
          <AppInputAssetButton
            tag="label"
            :for="useIdPrefix(id)"
            class="text-site-2"
          >
            {{ upload }}
            <input
              :id="useIdPrefix(id)"
              ref="inp"
              type="file"
              class="hidden"
              @input="
                async () => {
                  await readURL();
                  updateCachedInput(img);
                }
              "
            />
          </AppInputAssetButton>
        </div>
      </div>
    </template>
  </AppInputValue>
</template>
