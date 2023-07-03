export const useAssetKey = (property: string) => {
  return ASSET_PREFIX + property + ':';
};

export const useAssetId = (property: string) => {
  return useAssetKey(property) + useId();
};

export const useTakeAssetId = (id: string) => {
  const [property, assetId] = id.replace(ASSET_PREFIX, '').split(':');

  if (!property || !assetId) {
    throw new Error('Invalid asset id');
  }

  return property;
};
