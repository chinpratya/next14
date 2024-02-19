import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

import {
  createPolicySectionsSlice,
  initialPolicySectionsSliceState,
} from './slices/policy-sections-slice';
import {
  PolicyBuilderStore,
  PolicySectionsSlice,
} from './types';

export const policyBuilderStore = createStore<
  PolicyBuilderStore & PolicySectionsSlice
>((set, get, store) => ({
  resetPolicyBuilderState: () =>
    set({
      ...initialPolicySectionsSliceState,
    }),
  ...createPolicySectionsSlice(set, get, store),
}));

export const usePolicyBuilderStore = () =>
  useStore(policyBuilderStore);
