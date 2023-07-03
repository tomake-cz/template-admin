export const useSelectedStructureRecords = () => {
  return (
    [
      ...document.querySelectorAll(`#${useHyphenPath()} input:checked`),
    ] as HTMLInputElement[]
  ).filter((i) => i.name !== 'null');
};
