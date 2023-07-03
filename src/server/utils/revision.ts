export const getRevisionName = () => {
  return 'Revize 1';
};

type Model = {
  ActiveRevision: Record<string, unknown> | null;
  [key: string]: unknown;
};
export const revisionMerge = <T extends Model>(model: T) => {
  const activeRevision = model.ActiveRevision as NonNullable<
    T['ActiveRevision']
  >;

  const temp = model as Omit<T, 'ActiveRevision'> & {
    ActiveRevision?: T['ActiveRevision'];
  };
  delete temp.ActiveRevision;
  const parent = temp as Omit<T, 'ActiveRevision'>;

  return {
    ...activeRevision,
    ...parent,
  };
};

// type Revision = {
//   id: number;
//   revisionName: string;
//   dateCreated: Date;
// };
// export const revisionReturn = (revision: Revision) => {
//   const { id, revisionName, dateCreated } = revision;

//   return {
//     id,
//     name: revisionName,
//     dateCreated,
//   };
// };
