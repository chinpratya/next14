import { produce } from 'immer';
import _ from 'lodash';
import { StateCreator } from 'zustand';

import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import {
  ConsentBuilderStore,
  PurposeSlice,
} from '../types';

export const createPurposeSlice: StateCreator<
  ConsentBuilderStore & PurposeSlice,
  [],
  [],
  PurposeSlice
> = (set, get) => ({
  isOpenPurposeSetting: false,
  currentPurpose: null,
  onTogglePurposeSetting: (purposeId?: string) => {
    const currentFormIndex = get().currentFormIndex;
    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === get().currentSectionId
      ) ?? -1;
    if (currentSectionIndex === -1) {
      set(
        produce((state) => {
          state.isOpenPurposeSetting = false;
          state.currentPurpose = null;
        })
      );
      return;
    }

    const purpose =
      get().formItems[currentFormIndex].sections?.[
        currentSectionIndex
      ].components?.find(
        (component) => component.purposeID === purposeId
      ) ?? null;

    set(
      produce((state) => {
        state.isOpenPurposeSetting =
          !state.isOpenPurposeSetting;
        state.currentPurpose = purpose;
      })
    );
  },
  onChangePurpose: (purpose) => {
    const currentFormIndex = get().currentFormIndex;
    const currentPurposeId = _.get(
      get(),
      'currentPurpose.purposeID',
      ''
    );
    const purposeObj = {
      ...(_.get(
        get(),
        'currentPurpose',
        {}
      ) as unknown as Record<string, unknown>),
      ...purpose,
    };

    if (!currentPurposeId) {
      console.error('Purpose id not found');
    }

    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === get().currentSectionId
      ) ?? -1;

    if (currentSectionIndex === -1) {
      console.error(
        `Section with id ${
          get().currentSectionId
        } not found`
      );
      return;
    }

    const currentPurposeIndex =
      get().formItems[currentFormIndex].sections?.[
        currentSectionIndex
      ].components?.findIndex(
        (component) =>
          component.purposeID === currentPurposeId
      ) ?? -1;

    if (currentPurposeIndex === -1) {
      console.error(
        `Purpose with id ${currentPurposeId} not found`
      );
      return;
    }

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(
          currentPurposeIndex,
          1,
          purposeObj
        );
        state.isOpenPurposeSetting =
          !state.isOpenPurposeSetting;
        state.currentPurpose = null;
      })
    );
  },
  usedPurposeIds: [],
  onAddPurpose: async (purposeId) => {
    const currentFormIndex =
      get().formItems.findIndex(
        (formItem) => formItem.id === get().currentFormId
      ) ?? 0;

    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === get().currentSectionId
      ) ?? 0;

    const dropPosition =
      get().formItems[currentFormIndex].sections?.[
        currentSectionIndex
      ].components?.length ?? 0;

    const purposes =
      (queryClient.getQueryData([
        consentManagementQueryKeys.collectionPoint.purpose(
          get().storeId ?? ''
        ),
      ]) as Record<string, unknown>[]) ?? [];

    const purpose = purposes?.find(
      (purpose) => purpose.purposeID === purposeId
    );

    if (!purpose) {
      console.error(
        `Purpose with id ${purposeId} not found`
      );
      return;
    }

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(dropPosition, 1, {
          ...purpose,
          displayType:
            get().formSetting.form?.purposeDisplayType ??
            purpose.displayType,
          type: 'purpose',
        });
        state.usedPurposeIds.push(purposeId);
      })
    );
  },
  onDropPurpose: async (
    sectionId,
    purposeId,
    position
  ) => {
    const currentFormIndex =
      get().formItems.findIndex(
        (formItem) => formItem.id === get().currentFormId
      ) ?? 0;

    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === sectionId
      ) ?? 0;

    const droppedPurpose = {
      id: purposeId,
      type: 'loading',
    };

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(position, 0, droppedPurpose);
        state.usedPurposeIds.push(purposeId);
      })
    );

    const purposes =
      (queryClient.getQueryData([
        consentManagementQueryKeys.collectionPoint.purpose(
          get().storeId ?? ''
        ),
      ]) as Record<string, unknown>[]) ?? [];

    const purpose = purposes?.find(
      (purpose) => purpose.purposeID === purposeId
    );

    if (!purpose) {
      console.error(
        `Purpose with id ${purposeId} not found`
      );
      return;
    }

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(position, 1, {
          ...purpose,
          displayType:
            get().formSetting.form?.purposeDisplayType ??
            purpose.displayType,
          type: 'purpose',
        });
      })
    );
  },
});
