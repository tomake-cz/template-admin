// export const MAIN_SEPARATOR = '/';
// export const SUB_SEPARATOR = '->';

// stores
export { useActionStore } from '@/stores/ActionStore';
export { useAppStore } from '@/stores/AppStore';
export { useInputStore } from '@/stores/InputStore';
export { useMutationStore } from '@/stores/MutationStore';
export { useNotificationStore } from '@/stores/NotificationStore';
export { usePageStore } from '@/stores/PageStore';
export { useUploadStore } from '@/stores/UploadStore';
export { useViewStore } from '@/stores/ViewStore';

// inputs
export {
  useAssetKey,
  useAssetId,
  useTakeAssetId,
} from '@/composables/input/useAssetId';
export { useRemainingCharacters } from '@/composables/input/useRemainingCharacters';
export {
  useGroupKey,
  useGroupId,
  useTakeGroupId,
} from '~/composables/input/useGroupId';
