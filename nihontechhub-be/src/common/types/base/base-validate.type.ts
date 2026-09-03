export type TBaseValidateType = {
  exists: 'exists';
  active: 'active';
  deleted: 'deleted';
  duplicate: 'duplicate';
};

export type TBaseMetadata<T, E> = {
  mapTypes: Map<keyof T, keyof T>;
  keyFind: keyof E;
};
