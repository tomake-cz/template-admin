const SEPARATOR = '-';

export const useIdPrefix = (id: string) => {
  const route = useRoute();
  return (
    route.path.replaceAll('/', SEPARATOR).replace(SEPARATOR, '') +
    SEPARATOR +
    id
  );
};

export const useStripIdPrefix = (id: string) => {
  const route = useRoute();
  const prefix =
    route.path.replaceAll('/', SEPARATOR).replace(SEPARATOR, '') + SEPARATOR;
  return id.replace(prefix, '');
};
