<script setup lang="ts">
const { getEnabledViewKeys } = useViewStore();

defineEmits<{
  (event: 'toggle', state: boolean): void;
}>();
</script>

<template>
  <tr>
    <td>
      <InputCheckbox
        name="null"
        size="md"
        styling="transparent"
        @toggle="$emit('toggle', $event)"
      />
    </td>
    <template v-for="{ translated } in getEnabledViewKeys()" :key="translated">
      <td>
        {{ translated }}
      </td>
    </template>
  </tr>
</template>
