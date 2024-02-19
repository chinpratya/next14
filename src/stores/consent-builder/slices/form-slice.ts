import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  ConsentFormItemsType,
  FormSlice,
} from '../types';

export const createFormSlice: StateCreator<
  ConsentBuilderStore & FormSlice,
  [],
  [],
  FormSlice
> = (set) => ({
  onAddForm: () =>
    set(
      produce((state) => {
        state.formItems.push({
          id: uuid(),
          name: '',
          sections: [],
        });
      })
    ),
  onDeleteForm: (formId) =>
    set(
      produce((state) => {
        state.formItems = state.formItems.filter(
          (form: ConsentFormItemsType) =>
            form.id !== formId
        );
      })
    ),
});
