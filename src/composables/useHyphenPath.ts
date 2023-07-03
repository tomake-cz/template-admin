export const SEPARATOR = '-';

export const useHyphenPath = () => {
  const route = useRoute();
  return route.path.replaceAll('/', SEPARATOR).replace(SEPARATOR, '');
};
