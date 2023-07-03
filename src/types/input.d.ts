import { ZodNumber, ZodString } from 'zod';

export interface InputProps<V = InputValue> {
  label?: string;
  info?: string;
  value?: V | null;
  id: string;
  isSmaller?: boolean;
  required?: boolean;
}

export interface InputRoot {
  type: InputType;
  validity?: {
    schema: ZodString | ZodNumber;
    conditions: string[];
  };
  html?: true;
}

declare global {
  interface InputParent extends Omit<InputRoot, 'type'> {}

  type Asset = {
    id: number | undefined;
    name: string;
    url: string;
    size: number;
    extension: string;
    type: string;
    bytes?: number[];
    blurhash?: string | null;
    timestamp: string | null;
  };

  type InputValidity = NonNullable<InputParent['validity']>;
  type InputValue = string | number | boolean | Asset | undefined | null;
  type InputType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'asset'
    | 'assets'
    | 'group';

  type Input<T = InputValue> = {
    name: string;
    value: T;
    required: boolean;
    type: InputType;
    schema?: InputValidity['schema'];
    html?: true;
  };

  type Item = {
    [key: string]: InputValue | null;
  };
  type Group = Item[] | null;
  type Value = InputValue | Item | Group | null;
  type Data = Record<string, Value>;
  type InputData = Data | null;

  type AnyInputValue =
    | InputValue
    | Record<string, InputValue | null>
    | Group
    | null;

  type Parent = {
    dateUpload: string;
    dateExpire: string | null;
  } & Record<string, InputValue | null | undefined>;

  type ParseAssetReturn = ReturnType<MapOfInputs['parseAsset']>;

  type ReturnData<D extends Data> = {
    [K in keyof D]: K extends ExcludeKeys<D>
      ? D[K] extends AnyInputValue
        ? D[K] extends Asset | null
          ? NonNullable<ParseAssetReturn>
          : D[K] extends Asset[] | undefined
          ? NonNullable<ParseAssetReturn>[]
          : D[K] extends InputValue
          ? NonNullable<D[K]>
          : D[K] extends Group
          ? D[K]
          : D[K] extends Parent | null | undefined
          ? never
          : D[K] extends InputValue | null
          ? NonNullable<D[K]>
          : never
        : 'outer'
      : never;
  };

  type Globals = {
    dateUpload?: string;
    dateExpire?: string;
    notes?: string;
    state?: boolean;
  };
}

export {};
