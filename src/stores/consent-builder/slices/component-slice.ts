import { produce } from 'immer';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  ComponentSlice,
} from '../types';

const checkComponentId = (
  component: Record<string, unknown>,
  componentId: string
): boolean => {
  return (
    component.name === componentId ||
    component.id === componentId ||
    component.purposeID === componentId ||
    component.activityID === componentId
  );
};

export const createComponentSlice: StateCreator<
  ConsentBuilderStore & ComponentSlice,
  [],
  [],
  ComponentSlice
> = (set, get) => ({
  onMoveComponent: (
    sourceSectionId,
    sourceIndex,
    destinationSectionId,
    destinationIndex
  ) => {
    if (sourceSectionId === destinationSectionId) {
      const currentFormIndex = get().formItems.findIndex(
        (formItem) => formItem.id === get().currentFormId
      );
      const currentSectionIndex =
        get().formItems[
          currentFormIndex
        ].sections?.findIndex(
          (section) => section.id === sourceSectionId
        ) ?? 0;
      set(
        produce((state) => {
          const [removed] =
            state.formItems[currentFormIndex].sections?.[
              currentSectionIndex
            ].components?.splice(sourceIndex, 1) ?? [];
          state.formItems[currentFormIndex].sections?.[
            currentSectionIndex
          ].components?.splice(
            destinationIndex,
            0,
            removed
          );
        })
      );
    }
    if (sourceSectionId !== destinationSectionId) {
      const currentFormIndex = get().formItems.findIndex(
        (formItem) => formItem.id === get().currentFormId
      );
      const sourceSectionIndex =
        get().formItems[
          currentFormIndex
        ].sections?.findIndex(
          (section) => section.id === sourceSectionId
        ) ?? 0;
      const destinationSectionIndex =
        get().formItems[
          currentFormIndex
        ].sections?.findIndex(
          (section) => section.id === destinationSectionId
        ) ?? 0;
      set(
        produce((state) => {
          const [removed] =
            state.formItems[currentFormIndex].sections?.[
              sourceSectionIndex
            ].components?.splice(sourceIndex, 1) ?? [];
          state.formItems[currentFormIndex].sections?.[
            destinationSectionIndex
          ].components?.splice(
            destinationIndex,
            0,
            removed
          );
        })
      );
    }
  },
  onMoveUpComponent: (componentId) => {
    if (!componentId) {
      console.error('Field id not found');
      return;
    }

    const currentFormIndex = get().currentFormIndex;
    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find((component) =>
          checkComponentId(component, componentId)
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      console.error('Field not found in any section');
      return;
    }

    const position =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.findIndex(
        (component: Record<string, unknown>) =>
          checkComponentId(component, componentId)
      ) ?? -1;

    if (position === -1) {
      console.error("Error finding field's position");
      return;
    }

    if (position === 0) {
      console.log('Field already at top');
      return;
    }

    set(
      produce((state) => {
        const [removed] =
          state.formItems[currentFormIndex].sections?.[
            sectionIndex
          ].components?.splice(position, 1) ?? [];
        state.formItems[currentFormIndex].sections?.[
          sectionIndex
        ].components?.splice(position - 1, 0, removed);
      })
    );
  },
  onMoveDownComponent: (componentId) => {
    if (!componentId) {
      console.error('Field id not found');
      return;
    }

    const currentFormIndex = get().currentFormIndex;
    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find((component) =>
          checkComponentId(component, componentId)
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      console.error('Field not found in any section');
      return;
    }

    const position =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.findIndex(
        (component: Record<string, unknown>) =>
          checkComponentId(component, componentId)
      ) ?? -1;

    if (position === -1) {
      console.error('Field not found in any section');
      return;
    }

    set(
      produce((state) => {
        const [removed] =
          state.formItems[currentFormIndex].sections?.[
            sectionIndex
          ].components?.splice(position, 1) ?? [];
        state.formItems[currentFormIndex].sections?.[
          sectionIndex
        ].components?.splice(position + 1, 0, removed);
      })
    );
  },
  onDeleteComponent: (componentId) => {
    if (!componentId) {
      console.error('Field id not found');
      return;
    }
    const currentFormIndex = get().currentFormIndex;
    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find((component) =>
          checkComponentId(component, componentId)
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      console.error('Field not found in any section');
      return;
    }

    const position =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.findIndex(
        (component: Record<string, unknown>) =>
          checkComponentId(component, componentId)
      ) ?? -1;

    if (position === -1) {
      console.error('Error finding field position');
      return;
    }

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          sectionIndex
        ].components?.splice(position, 1);
        state.usedPurposeIds =
          state.usedPurposeIds.filter(
            (purposeId: string) =>
              purposeId !== componentId
          );
        state.usedActivityIds =
          state.usedActivityIds.filter(
            (activityId: string) =>
              activityId !== componentId
          );
        state.usedIdentifierIds =
          state.usedIdentifierIds.filter(
            (identifierId: string) =>
              identifierId !== componentId
          );
      })
    );
  },
});
