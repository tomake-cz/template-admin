export const useUndefinedId = (id: number | undefined) => {
  if (id === undefined) return undefined;
  return id === -1 ? undefined : id;
};
