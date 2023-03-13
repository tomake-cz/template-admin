type Path = string;
type Mutation = () => void;
const mutations = new Map<Path, Mutation>();

const fallback = () => {
  console.log('fallback mutation');
};

export const useActiveMutation = () => {
  const mutation = useGetMutation();

  if (!mutation) {
    fallback();
    return;
  }

  mutation();
};

export const useGetMutation = () => {
  const route = useRoute();
  return mutations.get(route.path);
};

export const useSetMutation = (mutation: Mutation) => {
  const route = useRoute();
  mutations.set(route.path, mutation);
};
