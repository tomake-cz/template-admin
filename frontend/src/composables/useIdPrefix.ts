export const useIdPrefix = (id: string) => {
  return useHyphenPath() + SEPARATOR + id;
};

export const useStripIdPrefix = (id: string) => {
  const prefix = useHyphenPath() + SEPARATOR;
  return id.replace(prefix, '');
};
