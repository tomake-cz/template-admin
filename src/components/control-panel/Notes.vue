<script setup lang="ts">
defineProps<{
  notes?: string | undefined | null;
}>();

const { controlPanel } = storeToRefs(useAppStore());
const id = 'notes';

const area = ref<HTMLTextAreaElement>();
</script>

<template>
  <AppInputValue :id="id" :value="notes" :required="false" type="string">
    <template #default="{ currValue, updateCachedInput }">
      <textarea
        :id="id"
        ref="area"
        :placeholder="controlPanel.notes"
        :value="currValue ?? ''"
        class="min-h-[90px] w-full rounded-[12px] border-[1px] border-solid border-gray-dark bg-gray-light p-2 text-xs font-normal text-black-light"
        @input="updateCachedInput(area?.value ?? '')"
      />
    </template>
  </AppInputValue>
</template>
