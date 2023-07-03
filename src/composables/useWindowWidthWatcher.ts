export const useWindowWidthWatcher = (callback: (width: number) => void) => {
  const width = ref(0);

  const updateWidth = () => {
    width.value = window.screen.width;
  };

  onMounted(() => {
    width.value = window.screen.width;
    window.addEventListener('resize', updateWidth);
  });
  onUnmounted(() => window.removeEventListener('resize', updateWidth));

  watch(width, () => {
    callback(width.value);
  });
};
