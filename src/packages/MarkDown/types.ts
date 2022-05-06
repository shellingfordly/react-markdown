import type { Dispatch, SetStateAction } from 'react';
import type { ContextStore } from './context';

export type SetStateType = Dispatch<SetStateAction<ContextStore>>;
