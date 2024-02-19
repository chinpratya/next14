import _ from 'lodash';
import { z } from 'zod';

import {
  WebformBuilderIfLogic,
  WebformBuilderItem,
} from '../../share';

const FormValue = z.any();

type Logic = WebformBuilderIfLogic & {
  currentValue: z.infer<typeof FormValue>;
};

const getFieldKeyOrder = (
  formItem: WebformBuilderItem[]
) => {
  const formKeys = [] as string[];
  formItem.forEach((item) => {
    if (item.children) {
      formKeys.push(
        item.key,
        ...getFieldKeyOrder(item.children)
      );
    } else {
      formKeys.push(item.key);
    }
  });
  return formKeys;
};

const getAllLogicInFormItems = (
  formItems: WebformBuilderItem[]
): Logic[] => {
  const logic = [] as Logic[];
  formItems.forEach((item) => {
    let currentValue =
      item.value as Logic['currentValue'];
    if (item.widget === 'check-box') {
      currentValue = item?.value?.checked;
    }
    if (item.widget === 'radio-box') {
      currentValue = item?.value?.selected;
    }
    if (item.logic) {
      logic.push(
        ...item.logic.if.map(
          (ifLogic): Logic => ({
            ...ifLogic,
            currentValue,
          })
        )
      );
    }
    if (item.children) {
      logic.push(
        ...getAllLogicInFormItems(item.children)
      );
    }
  });
  return logic;
};

const filteredFormItemsLogic = (
  formItems: WebformBuilderItem[],
  logic: Logic[]
): WebformBuilderItem[] => {
  const formItemsLogic = [] as WebformBuilderItem[];
  formItems.forEach((item) => {
    const itemsLogic = _.filter(logic, {
      target: item.key,
    });

    const checkLogics = itemsLogic.map(
      (itemLogic): boolean => {
        if (itemLogic.condition === 'equal') {
          return (
            itemLogic.currentValue === itemLogic.value
          );
        }
        if (itemLogic.condition === 'not-equal') {
          return (
            itemLogic.currentValue !== itemLogic.value
          );
        }
        if (itemLogic.condition === 'contain') {
          return itemLogic.currentValue?.includes(
            itemLogic.value as string
          );
        }
        if (itemLogic.condition === 'not-empty') {
          return !!itemLogic.currentValue;
        }
        if (itemLogic.condition === 'empty') {
          return !itemLogic.currentValue;
        }
        return false;
      }
    );

    if (item?.children) {
      const children = filteredFormItemsLogic(
        item.children,
        logic
      );
      if (children.length > 0) {
        formItemsLogic.push({
          ...item,
          children,
        });
      }
    } else {
      if (
        checkLogics.includes(true) ||
        itemsLogic.length === 0
      ) {
        formItemsLogic.push(item);
      }
    }
  });

  return formItemsLogic;
};

export const filteredAssessmentLogic = (
  formItems: WebformBuilderItem[]
): string[] => {
  const newFormItems = _.cloneDeep(formItems);
  const logic = getAllLogicInFormItems(newFormItems);
  const filteredForm = filteredFormItemsLogic(
    newFormItems,
    logic
  );
  return getFieldKeyOrder(filteredForm);
};
