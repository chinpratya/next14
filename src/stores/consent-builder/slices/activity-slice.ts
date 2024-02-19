import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import {
  ConsentBuilderStore,
  ActivitySlice,
} from '../types';

export const createActivitySlice: StateCreator<
  ConsentBuilderStore & ActivitySlice,
  [],
  [],
  ActivitySlice
> = (set, get) => ({
  usedActivityIds: [],
  onDropActivity: (sectionId, activityId, position) => {
    const storeId = get().storeId;
    if (!storeId) {
      console.error('Store ID not found');
      return;
    }
    const activities = queryClient.getQueryData([
      consentManagementQueryKeys.preference.activities(
        storeId
      ),
    ]) as Record<string, unknown>[];

    const droppedActivity = activities?.find(
      (activity) => activity.activityID === activityId
    );
    if (!droppedActivity) {
      console.error(
        `Activity with id ${activityId} not found`
      );
      return;
    }
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

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.splice(position, 0, {
          ...droppedActivity,
          type: 'activity',
        });
        state.usedActivityIds.push(activityId);
      })
    );
  },
  onAddActivity: (activityId) => {
    const storeId = get().storeId;
    if (!storeId) {
      console.error('Store ID not found');
      return;
    }

    const activities =
      (queryClient.getQueryData([
        consentManagementQueryKeys.preference.activities(
          storeId
        ),
      ]) as Record<string, unknown>[]) ?? [];
    const droppedActivity = activities?.find(
      (activity) => activity.activityID === activityId
    );
    if (!droppedActivity) {
      console.error(
        `Activity with id ${activityId} not found`
      );
      return;
    }

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

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          currentSectionIndex
        ].components?.push({
          ...droppedActivity,
          type: 'activity',
        });
        state.usedActivityIds.push(activityId);
      })
    );
  },
});
