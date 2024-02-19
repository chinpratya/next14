import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

import { initialConsentBuilder } from './initialConsentBuilder';
import { createActivitySlice } from './slices/activity-slice';
import { createActivityTypeSlice } from './slices/activity-type-slice';
import { createComponentSlice } from './slices/component-slice';
import { createConditionSlice } from './slices/condition-slice';
import { createFieldSlice } from './slices/field-slice';
import { createFormSettingSlice } from './slices/form-setting-slice';
import { createFormSlice } from './slices/form-slice';
import { createIdentifierSlice } from './slices/identifier-slice';
import { createLabelSlice } from './slices/label-slice';
import { createPurposeSlice } from './slices/purpose-slice';
import { createRequestTypeDsarSlice } from './slices/request-type-dsar-slice';
import { createRequestTypeSlice } from './slices/request-type-slice';
import { createSectionSlice } from './slices/section-slice';
import { createTranslationSlice } from './slices/translate-slice';
import {
  ConsentBuilderStore,
  ActivitySlice,
  ActivityTypeSlice,
  ComponentSlice,
  ConditionSlice,
  FieldSlice,
  FormSettingSlice,
  FormSlice,
  LabelSlice,
  PurposeSlice,
  SectionSlice,
  TranslationSlice,
  RequestTypeDsarSlice,
  RequestTypeSlice,
  IdentifierSlice,
} from './types';

export * from './types';

export const consentBuilderStore = createStore<
  ConsentBuilderStore &
    ActivitySlice &
    ActivityTypeSlice &
    ComponentSlice &
    ConditionSlice &
    FieldSlice &
    FormSettingSlice &
    FormSlice &
    LabelSlice &
    SectionSlice &
    PurposeSlice &
    TranslationSlice &
    RequestTypeDsarSlice &
    RequestTypeSlice &
    IdentifierSlice
>((set, get, store) => ({
  ...initialConsentBuilder(),
  onSetStoreId: (storeId) => set(() => ({ storeId })),
  onInitiateForm: (form) =>
    set(() => {
      if (form?.formItems?.length) {
        const usedPurposeIds: string[] = [];
        const usedActivityIds: string[] = [];
        const usedIdentifierIds: string[] = [];

        let currentSectionId = '';

        form?.formItems?.forEach((formItem) => {
          formItem?.sections?.forEach((section) => {
            if (!currentSectionId) {
              currentSectionId = section?.id as string;
            }
            section?.components?.forEach((component) => {
              if (component?.type === 'purpose') {
                usedPurposeIds.push(
                  component?.purposeID as string
                );
              }
              if (component?.type === 'activity') {
                usedActivityIds.push(
                  component?.activityID as string
                );
              }
              if (component?.type === 'identifier') {
                usedIdentifierIds.push(
                  component?.name as string
                );
              }
            });
          });
        });

        return {
          currentFormId: form?.formItems[0]?.id ?? '',
          currentFormIndex: 0,
          currentSectionId: currentSectionId ?? '',
          currentSectionIndex: currentSectionId ? 0 : -1,
          usedPurposeIds,
          usedActivityIds,
          usedIdentifierIds,
          ...form,
        };
      }
      return initialConsentBuilder();
    }),
  reset: () => set(() => initialConsentBuilder()),
  ...createActivitySlice(set, get, store),
  ...createActivityTypeSlice(set, get, store),
  ...createComponentSlice(set, get, store),
  ...createConditionSlice(set, get, store),
  ...createFieldSlice(set, get, store),
  ...createFormSettingSlice(set, get, store),
  ...createFormSlice(set, get, store),
  ...createLabelSlice(set, get, store),
  ...createPurposeSlice(set, get, store),
  ...createSectionSlice(set, get, store),
  ...createTranslationSlice(set, get, store),
  ...createRequestTypeDsarSlice(set, get, store),
  ...createRequestTypeSlice(set, get, store),
  ...createIdentifierSlice(set, get, store),
}));

export const useConsentBuilderStore = () =>
  useStore(consentBuilderStore);
