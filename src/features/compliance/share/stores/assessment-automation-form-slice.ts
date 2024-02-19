import { GetState, SetState } from 'zustand';

import { filteredAssessmentLogic } from '../../portal-assessment/utils/filteredAssessmentLogic';
import { WebformBuilderItem } from '../types/webform-builder';

export interface AssessmentAutomationFormSlice {
  selectedFormKey: string;
  formItems: Array<WebformBuilderItem>;
  formItemsKey: Array<string>;
  setFormItems: (
    formItems: Array<WebformBuilderItem>
  ) => void;
  onSelectedForm: (formId: string) => void;
  onChangeFormValue: (
    value: Record<string, unknown>
  ) => void;
  onChangeFormItem: (
    item: Record<string, unknown>
  ) => void;
  onNextForm: (
    nextKey: string,
    value?: Record<string, unknown>
  ) => void;
  onPreviousForm: (prevKey: string) => void;
}

const insertFormItemsValue = (
  formItems: Array<WebformBuilderItem>,
  selectedFormKey: string,
  value?: Record<string, unknown>
): Array<WebformBuilderItem> => {
  return formItems.map((item) => ({
    ...item,
    ...(item.key === selectedFormKey && {
      value,
    }),
    ...(item.children && {
      children: insertFormItemsValue(
        item.children,
        selectedFormKey,
        value
      ),
    }),
  }));
};

const removeFormItemsValueOnLogic = (
  formItems: Array<WebformBuilderItem>,
  formItemsKey: Array<string>
): Array<WebformBuilderItem> => {
  return formItems.map((item) => ({
    ...item,
    ...(!formItemsKey.includes(item.key) && {
      value: undefined,
    }),
    ...(item.children && {
      children: removeFormItemsValueOnLogic(
        item.children,
        formItemsKey
      ),
    }),
  }));
};

const replaceFormItems = (
  formItems: Array<WebformBuilderItem>,
  selectedFormKey: string,
  newItem: Record<string, unknown>
): Array<WebformBuilderItem> => {
  return formItems.map((item) => ({
    ...item,
    ...(item.key === selectedFormKey && {
      ...newItem,
    }),
    ...(item.children && {
      children: replaceFormItems(
        item.children,
        selectedFormKey,
        newItem
      ),
    }),
  }));
};

export const createAssessmentAutomationFormSlice = (
  set: SetState<AssessmentAutomationFormSlice>,
  get: GetState<AssessmentAutomationFormSlice>
): AssessmentAutomationFormSlice => ({
  selectedFormKey: '',
  formItems: [],
  formItemsKey: [],
  onChangeFormItem: (item) => {
    const { formItems, selectedFormKey } = get();
    set({
      formItems: replaceFormItems(
        formItems,
        selectedFormKey,
        item
      ),
    });
  },
  onChangeFormValue: (value: Record<string, unknown>) => {
    const { formItems, selectedFormKey } = get();
    set({
      formItems: insertFormItemsValue(
        formItems,
        selectedFormKey,
        value
      ),
    });
  },
  setFormItems: (
    formItems: Array<WebformBuilderItem>
  ) => {
    const initialSelectedFormKey =
      formItems.length > 0 ? formItems[0].key : '';
    const selectedFormKey =
      location.hash.replace('#', '') ||
      initialSelectedFormKey;
    set({
      formItems,
      selectedFormKey,
      formItemsKey: filteredAssessmentLogic(formItems),
    });
  },
  onSelectedForm: (selectedFormKey: string) => {
    location.hash = selectedFormKey;
    set({ selectedFormKey });
  },
  onNextForm: (
    nextKey: string,
    value?: Record<string, unknown>
  ) => {
    const { formItems, selectedFormKey } = get();

    const cloneFormItems = insertFormItemsValue(
      formItems,
      selectedFormKey,
      value
    );

    const formItemsKey =
      filteredAssessmentLogic(cloneFormItems);

    set({
      selectedFormKey: nextKey,
      formItems: removeFormItemsValueOnLogic(
        cloneFormItems,
        formItemsKey
      ),
      formItemsKey,
    });
  },
  onPreviousForm: (prevKey: string) => {
    location.hash = prevKey;
    set({ selectedFormKey: prevKey });
  },
});
