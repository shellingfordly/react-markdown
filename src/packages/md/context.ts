import { createContext } from 'react';

export interface ContextStore {
  value: string;
  caretPos: [number, number];
}

const context = createContext<ContextStore>({
  value: '',
  caretPos: [0, 0],
});

export const Provider = context.Provider;
export const Consumer = context.Consumer;

export default context;
