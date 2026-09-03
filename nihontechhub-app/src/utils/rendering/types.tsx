import type { Children, ElementType } from 'react';

type TComponentRendering = {
  id: string;
  config?: { [key: string]: unknown };
  children?:
    | string
    | typeof Children
    | ElementType
    | (() => JSX.Element)
    | (typeof Children)[]
    | ElementType[]
    | (() => JSX.Element)[]
    | TComponentRendering[];
  component: ElementType | (() => JSX.Element);
};

export type TDataRendering = TComponentRendering[];
