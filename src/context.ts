import { createContext } from 'react';

const context = createContext('md');

export const Provider = context.Provider;
export const Consumer = context.Consumer;

export default context;
