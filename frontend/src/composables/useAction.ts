import { storeToRefs } from 'pinia';
import { useAppDataStore } from '../stores/AppDataStore';

type Name = string;
type Action = () => void;
const actions = new Map<Name, Action>();

const fallback = () => {
  console.log('fallback action');
};

export const useAction = (key: Name) => {
  const action = actions.get(key);

  if (!action) {
    fallback();
    return;
  }

  action();
};

const { actions: storeActions } = storeToRefs(useAppDataStore());
storeActions.value.forEach((state) =>
  actions.set(state.name, () => {
    console.log('not implemented');
  }),
);

export const useGetAction = (key: Name) => {
  return actions.get(key) ?? fallback;
};

const setAction = (name: Name, action: Action) => {
  const storeActionName = storeActions.value.find(
    (state) => state.name === name,
  );

  if (!storeActionName) {
    throw new Error(`Action ${name} not found`);
  }

  actions.set(name, action);
};

setAction('saveAndLeave', () => {
  useActiveMutation();
});
