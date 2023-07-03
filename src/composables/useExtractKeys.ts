export const useExtractKeys = (
  obj: AppRecord | AppStructure | Group | undefined,
) => {
  if (!obj) return [];
  const { getTranslatedKey } = storeToRefs(useAppStore());

  type Key = {
    name: string;
    translated: string;
    type: string;
    enabled: boolean;
  };
  const keys = Object.entries(obj)
    .map(([key, value]) => {
      // if (typeof value === 'object') return extractKeys(value);
      if (
        key.includes('date') ||
        key.includes('Date') ||
        key.includes('DATE')
      ) {
        return [
          key,
          {
            name: key,
            translated: getTranslatedKey.value(key),
            type: 'date',
            enabled: false,
          },
        ] as [string, Key];
      }

      return [
        key,
        {
          name: key,
          translated: getTranslatedKey.value(key),
          type: typeof value,
          enabled: false,
        },
      ] as [string, Key];
    })
    .filter(([k]) => k !== '__typename')
    .map(([k, v], i) => {
      if (i < 5) v.enabled = true;
      return [k, v];
    });

  return [...keys] as const;
};
