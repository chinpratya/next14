import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import { StateCreator } from 'zustand';

import { ConsentVisibilityType } from '@/types';

import {
  ConsentBuilderStore,
  ConditionSlice,
} from '../types';

export const createConditionSlice: StateCreator<
  ConsentBuilderStore & ConditionSlice,
  [],
  [],
  ConditionSlice
> = (set, get) => ({
  formConditions: [],
  quickAddCondition: (
    type: 'visibility' | 'workflow'
  ) => {
    const formConditions = get().formConditions;

    const countRule =
      formConditions.filter(
        (condition) => condition.type === type
      ).length + 1;

    const name =
      type === 'visibility'
        ? `กฎการมองเห็น ${countRule}`
        : `กฎการทำงาน ${countRule}`;

    const isVisibility =
      type === 'visibility' ? 'SHOW' : 'TO';

    const newCondition = {
      id: uuid(),
      type,
      name,
      condition: 'AND',
      rules: [],
      isVisibility,
      target: '',
    } as ConsentVisibilityType;

    set({
      formConditions: [...formConditions, newCondition],
    });
  },
  deleteCondition: (conditionId: string) => {
    const formConditions = get().formConditions;
    const newFormConditions = formConditions.filter(
      (condition) => condition.id !== conditionId
    );
    set({
      formConditions: newFormConditions,
    });
  },
  updateCondition: (
    conditionId: string,
    condition: ConsentVisibilityType
  ) => {
    const formConditions = get().formConditions;
    const updateIndex = formConditions.findIndex(
      (condition) => condition.id === conditionId
    );
    const newFormConditions = produce(
      formConditions,
      (draft) => {
        draft[updateIndex] = condition;
      }
    );
    set({
      formConditions: newFormConditions,
    });
  },
});
