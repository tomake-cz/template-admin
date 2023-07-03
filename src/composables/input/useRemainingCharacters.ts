export const useRemainingCharacters = (value: string, max: number) => {
  const remaining = computed(() => {
    return max - value.length;
  });

  return remaining;
};
