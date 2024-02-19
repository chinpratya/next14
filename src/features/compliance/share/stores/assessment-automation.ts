import { mountStoreDevtool } from 'simple-zustand-devtools';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

// eslint-disable-next-line import/no-cycle
import {
  createAssessmentAutomationFormSlice,
  AssessmentAutomationFormSlice,
} from './assessment-automation-form-slice';

export type AssessmentAutomationStore =
  AssessmentAutomationFormSlice;

export const assessmentAutomationStore =
  createStore<AssessmentAutomationStore>(
    (setState, getState) => ({
      ...createAssessmentAutomationFormSlice(
        setState,
        getState
      ),
    })
  );

export const useAssessmentAutomationStore = () =>
  useStore(assessmentAutomationStore);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool(
    'assessmentAutomation',
    assessmentAutomationStore
  );
}
