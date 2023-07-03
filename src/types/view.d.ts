declare global {
  type Key = {
    name: string;
    translated: string;
    type: string;
    enabled: boolean;
  };

  type SortDir = 'asc' | 'desc';

  type View = {
    id: number;
    isEditable: boolean;
    name: string;
    modelName: string;
    sortName: string;
    sortDir: SortDir;
    filters: {
      id: string;
      viewId: number;
      key: string;
      type: FilterType;
      constraint: FilterConstraint;
      value: string;
    }[];
    keys: Map<string, Key>;
    dateCreated?: Date;
    dateUpdated?: Date;
  };
  type ViewKey = keyof View;
  type ViewFetch = (Omit<View, 'keys'> & {
    keys: Key[];
  })[];
}

export {};
