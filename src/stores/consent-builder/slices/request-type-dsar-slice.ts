import { produce } from 'immer';
import _ from 'lodash';
import { StateCreator } from 'zustand';

import { getInitialWidget } from '@components/form-builder';

import {
  ConsentBuilderStore,
  RequestTypeDsarSlice,
} from '../types';

export const createRequestTypeDsarSlice: StateCreator<
  ConsentBuilderStore & RequestTypeDsarSlice,
  [],
  [],
  RequestTypeDsarSlice
> = (set, get) => ({
  openRequestTypeDsarSetting: false,
  currentRequestTypeDsar: null,
  toggleRequestTypeDsarSetting: (fieldId) => {
    if (!fieldId) {
      set({
        openRequestTypeDsarSetting: false,
        currentRequestTypeDsar: null,
      });
      return;
    }

    const currentFormIndex = get().currentFormIndex;
    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find(
          (component) => component.name === fieldId
        )
      ) ?? -1;
    if (sectionIndex === -1) {
      set(
        produce((state) => {
          state.openRequestTypeDsarSetting =
            !state.openRequestTypeDsarSetting;
          state.currentRequestTypeDsar = null;
        })
      );
      return;
    }

    const field =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.find(
        (component) => component.name === fieldId
      ) ?? null;

    set({
      openRequestTypeDsarSetting: true,
      currentRequestTypeDsar: field,
    });
  },
  onChangeRequestTypeDsar: (field) => {
    const currentFormIndex = get().currentFormIndex;
    const fieldId = _.get(
      get(),
      'currentRequestTypeDsar.name',
      ''
    );
    const fieldObj = {
      ...(_.get(
        get(),
        'currentRequestTypeDsar',
        {}
      ) as unknown as Record<string, unknown>),
      ...field,
      widgetProps: {
        ...(_.get(
          get(),
          'currentRequestTypeDsar.widgetProps',
          {}
        ) as unknown as Record<string, unknown>),
        ...(_.get(field, 'widgetProps', {}) as Record<
          string,
          unknown
        >),
      },
    };

    if (!fieldId) {
      console.error('Field id not found');
      return;
    }

    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find(
          (component) => component.name === fieldId
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      console.error('Field not found in any section');
      return;
    }

    const currentFieldIndex =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.findIndex(
        (component) => component.name === fieldId
      ) ?? -1;

    if (currentFieldIndex === -1) {
      console.error('Field not found');
      return;
    }
    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          sectionIndex
        ].components?.splice(
          currentFieldIndex,
          1,
          fieldObj
        );
        state.currentRequestTypeDsar = null;
        state.openRequestTypeDsarSetting = false;
        return state;
      })
    );
  },
  onAddRequestTypeDsar: (field) => {
    const currentFormIndex = get().currentFormIndex;
    const currentSectionIndex = get().currentSectionIndex;
    const droppedField = getInitialWidget(field);
    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.push(droppedField);
      })
    );
  },
  onDropRequestTypeDsar: (sectionId, field, position) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );
    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === sectionId
      ) ?? 0;
    const droppedField = getInitialWidget(field);
    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(position, 0, droppedField);
      })
    );
  },
});
