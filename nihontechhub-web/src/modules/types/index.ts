export type TComponentChildrenProps = Readonly<{
  children: React.ReactNode;
}>;

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type TCommonSearchParams = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  order?: ESortDirection;
  orderBy?: string;
};

export type TServerActionResponse = {
  success: boolean;
  message?: string;
};
