import { produce } from 'immer';
import _ from 'lodash';
import { StateCreator } from 'zustand';

import { getInitialWidget } from '@components/form-builder';

import {
  ConsentBuilderStore,
  FieldSlice,
} from '../types';

export const createFieldSlice: StateCreator<
  ConsentBuilderStore & FieldSlice,
  [],
  [],
  FieldSlice
> = (set, get) => ({
  openFieldSetting: false,
  currentField: null,
  toggleFieldSetting: (fieldId) => {
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
          state.openFieldSetting =
            !state.openFieldSetting;
          state.currentField = null;
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

    if (!field) {
      return;
    }

    set(
      produce((state) => {
        state.openFieldSetting = !state.openFieldSetting;
        state.currentField = field;
      })
    );
  },
  onChangeField: (field) => {
    const currentFormIndex = get().currentFormIndex;
    const fieldId = _.get(get(), 'currentField.name', '');
    const fieldObj = {
      ...(_.get(
        get(),
        'currentField',
        {}
      ) as unknown as Record<string, unknown>),
      ...field,
      widgetProps: {
        ...(_.get(
          get(),
          'currentField.widgetProps',
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
        state.currentField = null;
        state.openFieldSetting = false;
      })
    );
  },
  onAddField: (field) => {
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
  onDropField: (sectionId, field, position) => {
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
