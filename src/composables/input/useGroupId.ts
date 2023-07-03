export const useGroupKey = (objectName: string) => {
  return GROUP_PREFIX + objectName + PROPERTY_SEPARATOR;
};

export const useGroupId = (
  name: string,
  property: string,
  clientId: string,
) => {
  return GROUP_PREFIX + name + '->' + property + ':' + clientId;
};

export const useTakeGroupId = (key: string) => {
  const [nameSection, clientId] = key
    .replace(GROUP_PREFIX, '')
    .split(MAIN_SEPARATOR);

  const [name, property] = nameSection.split(PROPERTY_SEPARATOR);

  return {
    name,
    property,
    clientId,
  };
};
