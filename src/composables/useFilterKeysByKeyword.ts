import { Ref } from 'nuxt/dist/app/compat/capi';

export const useFilterKeysByKeyword = (
  keyword: Ref<string>,
  keys: Ref<Map<string, Key> | undefined>,
) => {
  return computed(() => {
    if (!keys.value) return [];
    if (!keyword.value) return [...keys.value];

    return [...keys.value].filter(([, { translated }]) =>
      translated.toLowerCase().includes(keyword.value.toLowerCase()),
    );
  });
};
