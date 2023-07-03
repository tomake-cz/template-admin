export const MAIN_SEPARATOR = ':';
export const PROPERTY_SEPARATOR = '->';
export const ASSET_PREFIX = 'asset' + MAIN_SEPARATOR;
export const GROUP_PREFIX = 'group' + MAIN_SEPARATOR;

export class InputMap extends Map<string, Input> {
  // EXTENDING MAP

  public count(key: string) {
    let count = 0;

    for (const [k] of this) {
      if (k.startsWith(key)) {
        count++;
      }
    }

    return count;
  }

  /**
   * Searches the map for the first input that starts with the given key.
   * @param key key to be searched for
   */
  private find(key: string) {
    for (const [k, v] of this) {
      if (k.startsWith(key)) {
        return [k, v];
      }
    }
  }

  /**
   * Searches the map for all inputs that start with the given key.
   * @param key key to be searched for
   */
  private findAll(key: string) {
    const result: [string, Input][] = [];

    for (const [k, v] of this) {
      if (k.startsWith(key)) {
        result.push([k, v]);
      }
    }

    return result;
  }

  // ASSETS

  public isAsset(key: string) {
    return key.startsWith(ASSET_PREFIX);
  }

  public getAsset(key: string) {
    if (key.startsWith(ASSET_PREFIX)) {
      throw new Error(
        `InputMap.getAsset: key mustn't start with ${ASSET_PREFIX}`,
      );
    }

    if (this.count(useAssetKey(key)) > 1) {
      throw new Error(
        `InputMap.getAsset: there are multiple inputs with key ${key}`,
      );
    }

    return this.find(useAssetKey(key)) as [string, Input<Asset>] | undefined;
  }

  public getAssets(key: string) {
    if (key.startsWith(ASSET_PREFIX)) {
      throw new Error(
        `InputMap.getAssets: key mustn't start with ${ASSET_PREFIX}`,
      );
    }

    return this.findAll(useAssetKey(key)) as [string, Input<Asset>][];
  }

  public assetParse(file: InputValue | undefined) {
    if (typeof file !== 'object' || file === null) return undefined;
    const isNew = file.id === -1 || file.id === undefined;
    if ((!('bytes' in file) && isNew) || (!file.bytes && isNew))
      return undefined;
    return { ...file, bytes: file.bytes ?? [] };
  }

  public parseAsset(key: string) {
    const file = this.getAsset(key)?.[1];
    return this.assetParse(file?.value);
  }

  public parseAssets(key: string) {
    return this.getAssets(key)
      .map(([, v]) => this.assetParse(v.value))
      .filter((x) => x !== undefined) as NonNullable<
      ReturnType<typeof this.parseAsset>
    >[];
  }

  // GROUP

  public isGroup(key: string) {
    return key.startsWith(GROUP_PREFIX);
  }

  public getGroupInputs(key: string) {
    if (key.startsWith(GROUP_PREFIX)) {
      throw new Error(
        `InputMap.getGroupInputs: key mustn't start with ${GROUP_PREFIX}`,
      );
    }

    return this.findAll(useGroupKey(key));
  }

  /**
   * Returns group with the clientId included
   */
  public getGroupRaw(key: string) {
    const group = [] as Record<string, InputValue | undefined>[];
    this.forEach((v, k) => {
      if (!k.startsWith(useGroupKey(key))) {
        return;
      }

      const { property, clientId } = useTakeGroupId(k);

      if (!group.some((x) => x.clientId === clientId)) {
        group.push({ clientId });
      }

      const object = group.find((x) => x.clientId === clientId);
      if (object) object[property] = v.value;
    });

    return group;
  }

  public getGroup(key: string) {
    return this.getGroupRaw(key).map((g) => {
      delete g.clientId;
      return g;
    });
  }

  public removeGroup(name: string, clientId: string) {
    this.forEach((_, k) => {
      if (k.startsWith(useGroupKey(name)) && k.endsWith(clientId)) {
        this.delete(k);
      }
    });
  }
}
