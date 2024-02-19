import { produce } from 'immer';
import _ from 'lodash';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  ActivityTypeSlice,
} from '../types';

export const createActivityTypeSlice: StateCreator<
  ConsentBuilderStore & ActivityTypeSlice,
  [],
  [],
  ActivityTypeSlice
> = (set, get) => ({
  openActivityTypeSetting: false,
  currentActivityType: null,
  onToggleActivityTypeSetting: (
    activityTypeId?: string
  ) => {
    if (!activityTypeId) {
      set(
        produce((state) => {
          state.openActivityTypeSetting =
            !state.openActivityTypeSetting;
          state.currentActivityType = null;
        })
      );
      return;
    }

    const currentFormIndex = get().currentFormIndex;
    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find(
          (component) => component.name === activityTypeId
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      set(
        produce((state) => {
          state.openActivityTypeSetting =
            !state.openActivityTypeSetting;
          state.currentActivityType = null;
        })
      );
      return;
    }

    const activityType =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.find(
        (component) => component.name === activityTypeId
      ) ?? null;

    if (!activityType) {
      return;
    }

    set(
      produce((state) => {
        state.openActivityTypeSetting =
          !state.openActivityTypeSetting;
        state.currentActivityType = activityType;
      })
    );
  },
  onChangeActivityType: (
    activityType: Record<string, unknown>
  ) => {
    const currentFormIndex = get().currentFormIndex;
    const activityTypeId = _.get(
      get(),
      'currentActivityType.name',
      ''
    );

    const activityTypeObj = _.merge(
      {},
      _.get(get(), 'currentActivityType', {}),
      activityType,
      {
        widgetProps: _.merge(
          {},
          _.get(
            get(),
            'currentActivityType.widgetProps',
            {}
          ),
          _.get(activityType, 'widgetProps', {})
        ),
      }
    );

    if (activityTypeObj?.initialValue) {
      activityTypeObj.initialValue =
        _.get(
          activityTypeObj,
          'widgetProps.options.[0].base',
          ''
        ) ?? '';
    }

    const sectionIndex =
      get().formItems[
        currentFormIndex
      ].sections?.findIndex((section) =>
        section.components?.find(
          (component) => component.name === activityTypeId
        )
      ) ?? -1;

    if (sectionIndex === -1) {
      console.error(`Section index not found`);
      return;
    }

    const activityTypeIndex =
      get().formItems[currentFormIndex].sections?.[
        sectionIndex
      ].components?.findIndex(
        (component) => component.name === activityTypeId
      ) ?? -1;

    if (activityTypeIndex === -1) {
      console.error(`Activity type index not found`);
      return;
    }

    set(
      produce((state) => {
        state.formItems[currentFormIndex].sections?.[
          sectionIndex
        ].components?.splice(activityTypeIndex, 1, {
          ...activityTypeObj,
        });
        state.openActivityTypeSetting = false;
      })
    );
  },
});
