export const useIdPrefix = (id: string) => {
  const route = useRoute();
  const path = route.path.split('/');
  const site = path[path.length - 1];
  return `${site}-${id}`;
};
