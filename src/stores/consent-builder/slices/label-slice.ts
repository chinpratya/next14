import { produce } from 'immer';
import { v4 as uuid } from 'uuid';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  LabelSlice,
} from '../types';

export const createLabelSlice: StateCreator<
  ConsentBuilderStore & LabelSlice,
  [],
  [],
  LabelSlice
> = (set, get) => ({
  isOpenLabelSetting: false,
  currentLabel: null,
  onToggleLabelSetting: (labelId?: string) => {
    if (!labelId) {
      set({ isOpenLabelSetting: false });
      return;
    }

    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );

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

    const currentLabel = get().formItems[
      currentFormIndex
    ].sections?.[currentSectionIndex].components?.find(
      (component) => component.id === labelId
    ) as Record<string, unknown> | undefined;

    console.log('currentLabel', currentLabel);

    if (!currentLabel) {
      console.error(`Label with id ${labelId} not found`);
      return;
    }

    set({
      isOpenLabelSetting: !get().isOpenLabelSetting,
      currentLabel,
    });
  },
  onChangeLabelSetting: (
    setting: Record<string, unknown>
  ) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );

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

    const currentLabelIndex =
      get().formItems[currentFormIndex].sections?.[
        currentSectionIndex
      ].components?.findIndex(
        (component) =>
          component.id === get().currentLabel?.id
      ) ?? -1;

    if (currentLabelIndex === -1) {
      console.error(
        `Label with id ${
          get().currentLabel?.id
        } not found`
      );
      return;
    }

    const currentLabel = get().formItems[currentFormIndex]
      .sections?.[currentSectionIndex].components?.[
      currentLabelIndex
    ] as Record<string, unknown> | undefined;

    if (!currentLabel) {
      console.error(
        `Label with id ${
          get().currentLabel?.id
        } not found`
      );
      return;
    }

    const newLabel = {
      ...currentLabel,
      ...setting,
    };

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(
          currentLabelIndex,
          1,
          newLabel
        );
      })
    );
  },
  onAddLabel: (label?: string) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );

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

    const newLabel = {
      id: uuid(),
      type: label ?? 'label',
      value: '<p>Label</p>',
    };

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.push(newLabel);
      })
    );
  },
  onDropLabel: (sectionId: string, position: number) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );

    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section) => section.id === sectionId
      ) ?? -1;

    if (currentSectionIndex === -1) {
      console.error(
        `Section with id ${sectionId} not found`
      );
      return;
    }

    const newLabel = {
      id: uuid(),
      type: 'label',
      value: '<p>Label</p>',
    };

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(position, 0, newLabel);
      })
    );
  },
});
