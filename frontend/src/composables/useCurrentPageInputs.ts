export const useCurrentPageInputs = () => {
  const id = '#' + useHyphenPath();
  const inputs = document.querySelector(id)?.querySelectorAll('input');
  const map = new Map<string, string>();
  inputs?.forEach((input) => {
    map.set(useStripIdPrefix(input.id), input.value);
  });
  return map;
};
