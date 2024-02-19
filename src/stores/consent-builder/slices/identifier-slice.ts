import { produce } from 'immer';
import _ from 'lodash';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  IdentifierSlice,
} from '../types';

const LIST_IDENTIFIERS = [
  {
    label: 'อีเมล',
    widget: 'input',
    name: 'identifier-email',
    type: 'identifier',
    rules: [
      {
        required: true,
        message: 'กรุณากรอกอีเมล',
      },
      {
        type: 'email',
        message: 'กรุณากรอกอีเมลให้ถูกต้อง',
      },
    ],
  },
  {
    label: 'เบอร์โทร',
    widget: 'input',
    name: 'identifier-phone-number',
    type: 'identifier',
    rules: [
      {
        required: true,
        message: 'กรุณากรอกเบอร์โทร',
      },
      {
        type: 'number',
        message: 'กรุณากรอกเบอร์โทรให้ถูกต้อง',
      },
    ],
  },
  {
    label: 'บัตรประชาชน',
    widget: 'input',
    name: 'identifier-national-id',
    type: 'identifier',
    rules: [
      {
        required: true,
        message: 'กรุณากรอกบัตรประชาชน',
      },
    ],
  },
  {
    label: 'อื่นๆ',
    widget: 'input',
    name: 'identifier-other',
    type: 'identifier',
  },
] as Record<string, unknown>[];
export const createIdentifierSlice: StateCreator<
  ConsentBuilderStore & IdentifierSlice,
  [],
  [],
  IdentifierSlice
> = (set, get) => ({
  listIdentifiers: LIST_IDENTIFIERS,
  usedIdentifierIds: [],
  openIdentifierSetting: false,
  currentIdentifier: null,
  toggleIdentifierSetting: (fieldId) => {
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
          state.openRequestSetting =
            !state.openRequestSetting;
          state.currentRequest = null;
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

    set(
      produce((state) => {
        console.log(
          'current request',
          state.openRequestSetting
        );

        state.openRequestSetting =
          !state.openRequestSetting;
        state.currentRequest = field;
      })
    );
  },

  onChangeIdentifier: (field) => {
    const currentFormIndex = get().currentFormIndex;
    const identifierId = _.get(
      get(),
      'currentIdentifier.name',
      ''
    );
    const identifierObj = {
      ...(_.get(
        get(),
        'currentIdentifier',
        {}
      ) as unknown as Record<string, unknown>),
      ...field,
      widgetProps: {
        ...(_.get(
          get(),
          'currentIdentifier.widgetProps',
          {}
        ) as unknown as Record<string, unknown>),
        ...(_.get(field, 'widgetProps', {}) as Record<
          string,
          unknown
        >),
      },
    };

    if (!identifierId) {
      console.error('Field id not found');
      return;
    }

    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find(
          (component) => component.name === identifierId
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      console.error('Field not found in any section');
      return;
    }

    const currentIdentifierIndex =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.findIndex(
        (component) => component.name === identifierId
      ) ?? -1;

    if (currentIdentifierIndex === -1) {
      console.error('Field not found');
      return;
    }
    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          sectionIndex
        ].components?.splice(
          currentIdentifierIndex,
          1,
          identifierObj
        );
        state.currentIdentifier = null;
        state.openIdentifierSetting = false;
      })
    );
  },
  onAddIdentifier: (identifierId) => {
    const currentFormIndex = get().currentFormIndex;
    const currentSectionIndex = get().currentSectionIndex;
    const identifier = get().listIdentifiers.find(
      (item) => item.name === identifierId
    );
    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.push(identifier);
        state.usedIdentifierIds.push(identifierId);
      })
    );
  },
  onDropIdentifier: (
    sectionId,
    identifierId,
    position
  ) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );
    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === sectionId
      ) ?? 0;

    const droppedIdentifier = get().listIdentifiers.find(
      (item) => item.name === identifierId
    );

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(
          position,
          0,
          droppedIdentifier
        );
        state.usedIdentifierIds.push(identifierId);
      })
    );
  },
});
