/* eslint-disable no-console */

declare global {
  type Upload = () => void;
}

type UploadFn<D extends Data> = (options: {
  values: ReturnData<D>;
  globals: Globals;
  id: number | undefined;
}) => Promise<unknown>;

export const useUploadStore = defineStore('upload', () => {
  const fallback = () => {
    console.log('fallback upload');
  };

  const run = () => {
    get()();
  };

  const get = () => {
    const path = useHyphenPath();

    const { getPage } = usePageStore();
    return getPage(path)?.upload ?? fallback;
  };

  const set = <D extends InputData>(mutation: UploadFn<NonNullable<D>>) => {
    const { setPageValues } = usePageStore();
    const { storeCachedInputs } = useInputStore();

    const upload = () => {
      const { messages, dynamicNav } = storeToRefs(useAppStore());
      const { setPageValues } = usePageStore();

      if (!checkValidity()) {
        useNotificationStore().add('error', messages.value.validationError);
        return;
      }

      setPageValues({ loading: true });

      const store = useInputStore();
      const values = store.constructObject<D>();
      const globals = store.constructGlobals();
      const id = useUndefinedId(usePageStore().getPage()?.id);

      const promise = mutation({
        values,
        globals,
        id,
      });

      const { add: useAddNotification } = useNotificationStore();
      promise.then((data) => {
        console.log('uploaded:', data);
        storeCachedInputs();
        useAddNotification('success', messages.value.saveSuccess);
        setPageValues({ loading: false });

        const path = useRoute().path.split('/');
        if (path.at(-1) === dynamicNav.value.create.url) {
          usePageStore().remove();
          const router = useRouter();
          setTimeout(() => {
            router.push({ path: path.slice(0, -1).join('/') });
          }, 200);
        }
      });
      promise.catch((error) => {
        console.log(error);
        useAddNotification('error', messages.value.saveError);
        setPageValues({ loading: false });
      });
    };

    setPageValues({
      upload,
    });
  };

  const checkValidity = () => {
    const wrong = [...useInputStore().getCachedInputs()].filter(([, val]) => {
      const isEmpty = val.value == null || val.value === '';
      if (isEmpty) {
        return val.required;
      }

      if (!val.schema) {
        return false;
      }

      return !val.schema.safeParse(val.value).success;
    });

    return wrong.length === 0;
  };

  return {
    run,
    get,
    set,
  };
});
