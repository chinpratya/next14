import _ from 'lodash';
import { StateCreator } from 'zustand';

import {
  PolicyBuilderStore,
  PolicySectionsSlice,
} from '../types';

export const initialPolicySectionsSliceState = {
  isHideAllPolicySections: false,
  isShowSettingPolicySection: false,
  policySectionData: null,
  policySections: [],
};

export const createPolicySectionsSlice: StateCreator<
  PolicyBuilderStore & PolicySectionsSlice,
  [],
  [],
  PolicySectionsSlice
> = (set, get) => ({
  ...initialPolicySectionsSliceState,
  initPolicySections: (policySections) => {
    const isHideAllPolicySections =
      _.filter(policySections, { hide: false }).length ===
      0;

    set(() => ({
      isHideAllPolicySections,
      policySections,
    }));
  },
  onDropPolicySection: (sectionId, destinationIndex) => {
    const policySections = [...get().policySections];
    const visiblePolicySections = _.filter(
      policySections,
      {
        hide: false,
      }
    );
    const sectionIndex = _.findIndex(policySections, {
      key: sectionId,
    });

    const section = policySections[sectionIndex];
    policySections.splice(sectionIndex, 1);

    if (destinationIndex === 0) {
      const updatedPolicySections = [
        ...policySections.slice(0, destinationIndex),
        {
          ...section,
          hide: false,
        },
        ...policySections.slice(destinationIndex),
      ];
      set({
        policySections: updatedPolicySections,
      });
    }

    const firstDestinationKey =
      visiblePolicySections[destinationIndex - 1]?.key;
    const firstDestinationIndex = _.findIndex(
      policySections,
      {
        key: firstDestinationKey,
      }
    );
    const updatedPolicySections = [
      ...policySections.slice(
        0,
        firstDestinationIndex + 1
      ),
      {
        ...section,
        hide: false,
      },
      ...policySections.slice(firstDestinationIndex + 1),
    ];
    set({
      isHideAllPolicySections: false,
      policySections: updatedPolicySections,
    });
  },
  onMoveUpPolicySection: (sectionId) => {
    set((state) => {
      const sectionIndex = state.policySections.findIndex(
        (section) => section.key === sectionId
      );
      const isMoveUp = sectionIndex > 0;
      if (!isMoveUp) return state;

      const policySections = [...state.policySections];
      const section = policySections[sectionIndex];
      policySections[sectionIndex] =
        policySections[sectionIndex - 1];
      policySections[sectionIndex - 1] = section;

      return {
        ...state,
        policySections,
      };
    });
  },
  onMoveDownPolicySection: (sectionId) => {
    set((state) => {
      const sectionIndex = state.policySections.findIndex(
        (section) => section.key === sectionId
      );
      const isMoveDown =
        sectionIndex < state.policySections.length - 1;
      if (!isMoveDown) return state;

      const policySections = [...state.policySections];
      const section = policySections[sectionIndex];
      policySections[sectionIndex] =
        policySections[sectionIndex + 1];
      policySections[sectionIndex + 1] = section;

      return {
        ...state,
        policySections,
      };
    });
  },
  onToggleHidePolicySection: (sectionId) => {
    set((state) => {
      const policySections = state.policySections.map(
        (section) => {
          if (section.key === sectionId) {
            return {
              ...section,
              hide: !section.hide,
            };
          }
          return section;
        }
      );
      const isHideAllPolicySections =
        _.filter(policySections, { hide: false })
          .length === 0;

      return {
        ...state,
        isHideAllPolicySections,
        policySections,
      };
    });
  },
  onToggleSettingPolicySection: (sectionId) => {
    if (!sectionId) {
      set({
        isShowSettingPolicySection: false,
        policySectionData: null,
      });
      return;
    }

    const policySectionData = get().policySections.find(
      (section) => section.key === sectionId
    );

    set({
      isShowSettingPolicySection:
        !get().isShowSettingPolicySection,
      policySectionData: policySectionData ?? null,
    });
  },
  onChangePolicySectionData: (data) => {
    const sectionId = get().policySectionData?.key;
    const policySections = get().policySections.map(
      (section) => {
        if (section.key === sectionId) {
          return {
            ...section,
            ...data,
          };
        }
        return section;
      }
    );

    set({
      isShowSettingPolicySection: false,
      policySectionData: null,
      policySections,
    });
  },
  onChangePolicySectionValue: (sectionId, value) => {
    const policySections = get().policySections.map(
      (section) => {
        if (section.key === sectionId) {
          return {
            ...section,
            value,
          };
        }
        return section;
      }
    );
    set({
      policySections,
    });
  },
});
