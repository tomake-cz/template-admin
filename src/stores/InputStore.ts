const GLOBAL_INPUT_NAMES = ['dateUpload', 'dateExpire', 'notes', 'state'];

const EXCLUDE_KEYS = [
  'dateCreated',
  'dateUpdated',
  'dateExpire',
  'dateUpload',
  'state',
  'notes',
] as const;

declare global {
  type ExcludeKeys<D> = Exclude<keyof D, (typeof EXCLUDE_KEYS)[number]>;
  type MapOfInputs = InstanceType<typeof InputMap>;
}

export const useInputStore = defineStore('input', () => {
  const { getPage, hasPage, setPageValues } = usePageStore();

  // cached inputs
  const hasCachedInputs = (name?: string) => {
    const page = getPage(name);
    return page ? page.inputs.cached.size > 0 : false;
  };
  const getCachedInputs = (name?: string) => {
    const page = getPage(name);
    return page ? page.inputs.cached : new InputMap();
  };

  // stored inputs
  const getStoredInputs = (name?: string) => {
    const page = getPage(name);
    return page ? page.inputs.stored : new InputMap();
  };

  // inputs
  const changedInputs = computed(() => {
    if (!hasPage()) {
      return new InputMap();
    }

    const changed = new InputMap();

    const cached = getCachedInputs();
    const stored = getStoredInputs();

    const [moreInputs, lessInputs] =
      cached.size > stored.size ? [cached, stored] : [stored, cached];

    moreInputs.forEach((value, name) => {
      const input = lessInputs.get(name);
      if (input !== value) {
        changed.set(name, cached.get(name) ?? value);
      }
    });
    return changed;
  });
  const globalInputs = computed(() => {
    if (!hasPage()) {
      return new InputMap();
    }

    const global = new InputMap();
    getCachedInputs().forEach((value, name) => {
      if (GLOBAL_INPUT_NAMES.includes(name)) {
        global.set(name, value);
      }
    });
    return global;
  });
  const setInput = (input: Input) => {
    if (hasPage()) {
      getCachedInputs().set(input.name, input);
      getStoredInputs().set(input.name, input);
      return;
    }

    setPageValues({
      inputs: {
        cached: new InputMap([[input.name, input]]),
        stored: new InputMap([[input.name, input]]),
      },
    });
  };

  // cached input
  const hasCachedInput = (name: string) => {
    const page = getPage();
    return page ? page.inputs.cached.has(name) : false;
  };
  const getCachedInput = (name: string) => {
    return getCachedInputs().get(name);
  };
  const setCachedInput = (input: Input) => {
    if (hasPage()) {
      getCachedInputs().set(input.name, input);
      return;
    }

    setPageValues({
      inputs: {
        cached: new InputMap([[input.name, input]]),
        stored: new InputMap(),
      },
    });
  };
  const removeCachedInput = (name: string) => {
    if (!hasPage()) {
      return;
    }
    getCachedInputs().delete(name);
  };

  // stored/cached inputs
  const setInputs = (key: 'cached' | 'stored', inputs: MapOfInputs) => {
    const page = getPage();
    if (page) {
      page.inputs[key] = inputs;
      return;
    }

    const isCached = key === 'cached';
    const newInputs = new InputMap();
    setPageValues({
      inputs: {
        cached: isCached ? new InputMap(inputs) : newInputs,
        stored: !isCached ? newInputs : new InputMap(inputs),
      },
    });
  };
  const storeCachedInputs = () => {
    if (hasPage()) {
      setInputs('stored', new InputMap(getCachedInputs()));
    }
  };
  const resetCache = () => {
    if (hasPage()) {
      setInputs('cached', new InputMap(getStoredInputs()));
    }
  };

  // info
  const getInfoInputs = () => {
    return getPage()?.inputs.info ?? new InputMap();
  };
  const setInfoInput = (input: Omit<Input, 'value'>) => {
    if (hasPage()) {
      const page = getPage();
      if (page) {
        page.inputs.info?.set(input.name, { ...input, value: undefined });
      }
      return;
    }

    setPageValues({
      inputs: {
        info: new InputMap([[input.name, { ...input, value: undefined }]]),
        cached: new InputMap(),
        stored: new InputMap(),
      },
    });
  };

  // groups
  const getGroupRaw = (name: string) => {
    if (!hasPage()) {
      return [];
    }

    return getCachedInputs().getGroupRaw(name);
  };
  const removeGroup = (name: string, clientId: string) => {
    if (!hasPage()) {
      return;
    }

    getCachedInputs().removeGroup(name, clientId);
  };

  const constructObject = <D extends InputData>() => {
    const inputs = getCachedInputs();
    const newInputs = new Map<string, InputValue | Asset[] | Group>();

    inputs.forEach((value, key) => {
      if (EXCLUDE_KEYS.includes(key as (typeof EXCLUDE_KEYS)[number])) {
        return;
      }

      if (inputs.isAsset(key)) {
        const k = useTakeAssetId(key);

        if (inputs.count(useAssetKey(k)) > 1) {
          const val = inputs.parseAssets(k);
          newInputs.set(k, val);
          return;
        }

        newInputs.set(k, inputs.parseAsset(k));
        return;
      }

      if (inputs.isGroup(key)) {
        const k = useTakeGroupId(key).name;
        const val = getCachedInputs().getGroup(k);
        newInputs.set(k, val);
        return;
      }

      newInputs.set(key, value.value);
    });

    return Object.fromEntries(newInputs) as ReturnData<NonNullable<D>>;
  };
  const constructGlobals = () => {
    const globals = [...globalInputs.value].map(([key, value]) => {
      return [key, value.value];
    });
    return Object.fromEntries(globals) as Globals;
  };

  const applyRevision = (revision: Revision) => {
    const inputs = getCachedInputs();
    const infoInputs = getInfoInputs();

    Object.entries(revision).forEach(([k, v]) => {
      const infoInput = infoInputs.get(k);
      if (!infoInput) {
        // console.log('no info input', k, v);
        return;
      }

      const input = inputs.get(k);
      if (input) {
        inputs.set(k, {
          ...input,
          value: v as InputValue,
        });
        return;
      }

      if (['asset', 'assets'].includes(infoInput.type)) {
        const assetInputs = getCachedInputs().getAssets(k);
        const assetInput = assetInputs[0];

        assetInputs.forEach(([assetInputKey]) => {
          inputs.delete(assetInputKey);
          infoInputs.delete(assetInputKey);
        });

        if (Array.isArray(v)) {
          v.forEach((asset) => {
            const assetId = useAssetId(k);
            inputs.set(assetId, {
              ...assetInput[1],
              name: assetId,
              value: asset as InputValue,
            });
          });
        } else {
          const assetId = useAssetId(k);
          inputs.set(assetId, {
            ...assetInput[1],
            name: assetId,
            value: v as InputValue,
          });
        }
        return;
      }

      if (infoInput.type === 'group') {
        const groupInputs = inputs.getGroupInputs(k);

        groupInputs.forEach(([groupInputKey]) => {
          inputs.delete(groupInputKey);
          infoInputs.delete(groupInputKey);
        });

        (v as { id: number; [key: string]: unknown }[]).forEach((ob) => {
          const clientId = useId();
          Object.entries(ob).forEach(([key, value]) => {
            const propertyKey = useGroupId(k, key, clientId);
            inputs.set(propertyKey, {
              ...infoInput,
              name: propertyKey,
              value: value as InputValue,
            });
          });
        });
      }
    });
  };

  return {
    cached: computed(() => getPage()?.inputs.cached ?? new InputMap()),
    stored: computed(() => getPage()?.inputs.stored ?? new InputMap()),
    info: computed(() => getPage()?.inputs.info ?? new InputMap()),
    changedInputs,
    globalInputs,
    setInput,
    hasCachedInput,
    getCachedInput,
    setCachedInput,
    removeCachedInput,
    hasCachedInputs,
    getCachedInputs,
    getStoredInputs,
    storeCachedInputs,
    resetCache,
    setInfoInput,
    getGroupRaw,
    removeGroup,
    constructObject,
    constructGlobals,
    applyRevision,
  };
});
