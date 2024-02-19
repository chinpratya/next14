import { produce } from 'immer';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  ConsentFormSectionType,
  SectionSlice,
} from '../types';

export const createSectionSlice: StateCreator<
  ConsentBuilderStore & SectionSlice,
  [],
  [],
  SectionSlice
> = (set, get) => ({
  isOpenSectionSetting: false,
  currentSection: null,
  onToggleSectionSetting: (sectionId?: string) => {
    if (!sectionId) {
      set(
        produce((state) => {
          state.isOpenSectionSetting =
            !state.isOpenSectionSetting;
          state.currentSection = null;
        })
      );
      return;
    }

    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );

    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section: ConsentFormSectionType) =>
          section.id === sectionId ??
          get().currentSectionId
      ) ?? -1;

    if (currentSectionIndex === -1) {
      console.error(
        `Section with id ${
          get().currentSectionId
        } not found`
      );
      return;
    }

    set(
      produce((state) => {
        state.isOpenSectionSetting =
          !state.isOpenSectionSetting;
        state.currentSection =
          state.formItems[currentFormIndex].sections?.[
            currentSectionIndex
          ];
        if (sectionId) {
          state.currentSectionId = sectionId;
        }
      })
    );
  },
  onChangeSectionSetting: (
    setting: Record<string, unknown>
  ) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );
    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section: ConsentFormSectionType) =>
          section.id === get().currentSectionId
      ) ?? -1;
    if (currentSectionIndex === -1) {
      console.error(
        `Section with id ${
          get().currentSectionId
        } not found`
      );
      return;
    }

    const newSectionSetting = {
      ...get().formItems[currentFormIndex].sections?.[
        currentSectionIndex
      ],
      ...setting,
    };

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections.splice(
          currentSectionIndex,
          1,
          newSectionSetting
        );
      })
    );
  },
  onAddSection: () => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );
    const totalSection =
      get().formItems[currentFormIndex].sections
        ?.length ?? 0;
    const sectionId = uuid();
    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.push({
          id: sectionId,
          name: 'กรุณากรอกหัวข้อ',
          components: [],
        });
        if (!state.currentSectionId) {
          state.currentSectionId = sectionId;
          state.currentSectionIndex = totalSection;
        }
      })
    );
  },
  onDeleteSection: (sectionId) => {
    const currentFormIndex = get().formItems.findIndex(
      (formItem) => formItem.id === get().currentFormId
    );

    const currentSectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex(
        (section: ConsentFormSectionType) =>
          section.id === sectionId
      ) ?? -1;

    if (currentSectionIndex === -1) {
      console.error(
        `Section with id ${sectionId} not found`
      );
      return;
    }

    const purposeIds =
      get()
        .formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.filter(
          (component) => component.type === 'purpose'
        )
        .map((component) => component.purposeID) ?? [];

    const activityIds =
      get()
        .formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.filter(
          (component) => component.type === 'activity'
        )
        .map((component) => component.activityID) ?? [];

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections =
          state.formItems[
            currentFormIndex
          ].sections?.filter(
            (section: ConsentFormSectionType) =>
              section.id !== sectionId
          );
        state.usedPurposeIds =
          state.usedPurposeIds.filter(
            (purposeId: string) =>
              !purposeIds.includes(purposeId)
          );
        state.usedActivityIds =
          state.usedActivityIds.filter(
            (activityId: string) =>
              !activityIds.includes(activityId)
          );
        state.currentSectionId = '';
        state.currentSectionIndex = -1;
      })
    );
  },
  onChangeSelectedSection: (sectionId) => {
    const newSectionIndex =
      get().formItems[
        get().currentFormIndex
      ].sections?.findIndex(
        (section: ConsentFormSectionType) =>
          section.id === sectionId
      ) ?? -1;

    if (newSectionIndex === -1) {
      console.error(
        `Section with id ${sectionId} not found`
      );
      return;
    }

    set(
      produce((state) => {
        state.currentSectionId = sectionId;
        state.currentSectionIndex = newSectionIndex;
      })
    );
  },
  onMoveUpSection: (sectionId: string) => {
    if (!sectionId) {
      return;
    }
    const currentFormIndex = get().currentFormIndex;
    const sectionIndex = get().formItems[
      currentFormIndex
    ].sections?.findIndex(
      (section: ConsentFormSectionType) =>
        section.id === sectionId
    );
    if (
      sectionIndex === undefined ||
      sectionIndex === -1
    ) {
      return;
    }
    const newSectionIndex = sectionIndex - 1;
    if (newSectionIndex < 0) {
      return;
    }
    set(
      produce((state) => {
        const sections =
          state.formItems[currentFormIndex].sections;
        const newSections = _.cloneDeep(sections);
        const temp = newSections[newSectionIndex];
        newSections[newSectionIndex] =
          newSections[sectionIndex];
        newSections[sectionIndex] = temp;
        state.formItems[currentFormIndex].sections =
          newSections;
        state.currentSectionIndex = newSectionIndex;
        state.currentSectionId =
          newSections[newSectionIndex].id;
      })
    );
  },
  onMoveDownSection: (sectionId) => {
    if (!sectionId) {
      return;
    }
    const currentFormIndex = get().currentFormIndex;
    const sectionIndex = get().formItems[
      currentFormIndex
    ].sections?.findIndex(
      (section: ConsentFormSectionType) =>
        section.id === sectionId
    );
    if (
      sectionIndex === undefined ||
      sectionIndex === -1
    ) {
      return;
    }
    const newSectionIndex = sectionIndex + 1;

    set(
      produce((state) => {
        const sections =
          state.formItems[currentFormIndex].sections;
        const newSections = _.cloneDeep(sections);
        const temp = newSections[newSectionIndex];
        newSections[newSectionIndex] =
          newSections[sectionIndex];
        newSections[sectionIndex] = temp;
        state.formItems[currentFormIndex].sections =
          newSections;
        state.currentSectionIndex = newSectionIndex;
        state.currentSectionId =
          newSections[newSectionIndex].id;
      })
    );
  },
});
