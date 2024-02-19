import { produce } from 'immer';
import _ from 'lodash';
import { StateCreator } from 'zustand';

import {
  ConsentBuilderStore,
  FormSettingSlice,
} from '../types';

const changePurposeDisplayType = (
  formItems: ConsentBuilderStore['formItems'],
  purposeDisplayType: string
) => {
  return formItems.map((formItem) => {
    return {
      ...formItem,
      sections: formItem?.sections?.map((section) => {
        return {
          ...section,
          components: section?.components?.map(
            (component) => {
              if (component?.type === 'purpose') {
                return {
                  ...component,
                  displayType: purposeDisplayType,
                };
              }
              return component;
            }
          ),
        };
      }),
    };
  });
};

export const createFormSettingSlice: StateCreator<
  ConsentBuilderStore & FormSettingSlice,
  [],
  [],
  FormSettingSlice
> = (set, get) => ({
  onChangeFormSetting: (setting) => {
    const purposeDisplayTypeChanged = _.get(
      setting,
      'form.purposeDisplayType',
      undefined
    ) as string;

    if (purposeDisplayTypeChanged) {
      set({
        formItems: changePurposeDisplayType(
          get().formItems,
          purposeDisplayTypeChanged
        ),
      });
    }

    set(
      produce((state) => {
        state.formSetting.form = {
          ...state.formSetting.form,
          ...(setting?.form ?? {}),
        };
        state.formSetting.page = {
          ...state.formSetting.page,
          ...(setting?.page ?? {}),
        };
      })
    );
  },
  onChangeFormSettingContent: (
    type: 'header' | 'footer',
    content: string
  ) => {
    set(
      produce((state) => {
        state.formSetting.form[`${type}Content`] =
          content ?? '';
      })
    );
  },
});
