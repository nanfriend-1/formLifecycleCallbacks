import { createContext, useContext } from 'react';
import { FormModel } from './Model/FormModel';

// context 必须有值
export const formModelContext = createContext<FormModel | null>(null);

export function useFormModel() {
  return useContext(formModelContext);
}