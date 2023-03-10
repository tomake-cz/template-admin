export const useCurrentPageInputs = () => {
  const inputs = document
    .querySelector('#mutations')
    ?.querySelectorAll('input');
  const map = new Map<string, string>();
  inputs?.forEach((input) => {
    map.set(useStripIdPrefix(input.id), input.value);
  });
  return map;
};
