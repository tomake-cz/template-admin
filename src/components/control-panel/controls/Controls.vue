<script setup lang="ts">
const props = defineProps<{
  data?: AppRecord | null;
  controls?: ControlPanelControls;
}>();
const { data: res } = toRefs(props);

const theControls = ref(
  props.controls ?? ['dateExpire', 'dateUpload', 'state', 'created', 'updated'],
) as Ref<ControlPanelControls>;

const { controls } = toRefs(storeToRefs(useAppStore()).controlPanel.value);
</script>

<template>
  <div class="flex flex-col gap-4 rounded-xl pr-12">
    <AppInputDate
      v-if="theControls.includes('dateUpload')"
      id="dateUpload"
      :label="controls.dateUpload"
      :value="res?.dateUpload"
      is-smaller
    />
    <AppInputDate
      v-if="theControls.includes('dateExpire')"
      id="dateExpire"
      :label="controls.dateExpire"
      :value="res?.dateExpire"
      is-smaller
    />
    <AppInputToggle
      v-if="theControls.includes('state')"
      id="state"
      :label="controls.state.label"
      :text="controls.state.text"
      :value="res?.state"
      is-smaller
    />
    <ControlPanelControlsInfo
      v-if="theControls.includes('created')"
      :label="controls.created"
    />
    <ControlPanelControlsInfo
      v-if="theControls.includes('updated')"
      :label="controls.updated"
    />
  </div>
</template>
