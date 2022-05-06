import { createContext } from 'react';

export interface ContextStore {
  value: string;
  caretPos: [number, number];
  isFull: boolean;
  isView: boolean;
}

export const ctxValue: ContextStore = {
  value: '',
  caretPos: [0, 0],
  isFull: false,
  isView: true,
};

const context = createContext<ContextStore>(ctxValue);

export const Provider = context.Provider;
export const Consumer = context.Consumer;

export default context;
