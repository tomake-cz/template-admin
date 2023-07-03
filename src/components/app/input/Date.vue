<script setup lang="ts">
import { InputProps } from '~/types/input';

defineProps<InputProps<string>>();

const { calendarIcon, clockIcon } = toRefs(
  storeToRefs(useAppStore()).controlPanel.value.controls,
);

const inp = ref<HTMLInputElement>();

const formatUTC = (date: string) => date + ':00.000Z';

const values = (dateStr: string | null | undefined) => {
  if (!dateStr) {
    return { year: '0', month: '0', day: '0', hour: '0', minute: '0' };
  }

  const [date, time] = dateStr.split('T');
  const [year, month, day] = date.split('-');
  const [hour, minute] = time.split(':');
  return {
    year: Number(year).toString(),
    month: Number(month).toString(),
    day: Number(day).toString(),
    hour: Number(hour).toString(),
    minute,
  };
};
const format = (dateStr: string | null | undefined) => {
  const { year, month, day, hour, minute } = values(dateStr);
  return {
    date: `${day}.${month}.${year.slice(2)}`,
    time: `${hour}:${minute}`,
  };
};
</script>

<template>
  <AppInput
    :id="id"
    :label="label"
    :info="info"
    :value="value"
    :is-smaller="isSmaller"
    :required="required"
    type="string"
  >
    <template #default="{ currValue, updateCachedInput }">
      <div class="relative h-9">
        <input
          :id="useIdPrefix(id)"
          ref="inp"
          :value="
            useDateFormat(currValue ?? new Date(), 'YYYY-MM-DDThh:mm', {
              locales: 'cs-CZ',
            }).value
          "
          type="datetime-local"
          class="h-full w-full rounded-[12px] text-xs font-normal"
          @input="updateCachedInput(formatUTC(inp?.value ?? ''))"
        />
        <div
          class="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-between gap-4 rounded-[12px] !border border-gray-darker bg-gray-lighter p-2"
        >
          <div class="flex h-full w-full items-center gap-2">
            <AppIcon :icon="calendarIcon" size="lg" />
            <span class="text-xs font-normal text-black-light">{{
              format(currValue).date
            }}</span>
          </div>
          <div class="flex h-full w-full items-center justify-end gap-2">
            <AppIcon :icon="clockIcon" size="lg" />
            <span class="text-xs font-normal text-black-light">{{
              format(currValue).time
            }}</span>
          </div>
        </div>
      </div>
    </template>
  </AppInput>
</template>
