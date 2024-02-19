import { Form, FormInstance } from 'antd';
import _ from 'lodash';
import { useCallback } from 'react';

import { ConsentVisibilityType } from '@/types';

export type UseFormCondition = {
  id: string;
  form: FormInstance;
  visibilities?: ConsentVisibilityType[];
};

const getVisibilityRules = (
  visibilities: ConsentVisibilityType[],
  formValues: Record<string, unknown>
): boolean => {
  const visibilitiesCheck = visibilities.map(
    (visibility): boolean => {
      const { rules, isVisibility, condition } =
        visibility;
      const checkRules = rules?.map((rule) => {
        const { id, operator, value } = rule;
        const fieldValue = _.get(formValues, id, '') as
          | string
          | string[]
          | number
          | number[]
          | boolean
          | boolean[];

        switch (operator) {
          case 'eq':
            return fieldValue === value;
          case 'neq':
            return fieldValue !== value;
          case 'gt':
            return fieldValue > value;
          case 'gte':
            return fieldValue >= value;
          case 'lt':
            return fieldValue < value;
          case 'lte':
            return fieldValue <= value;
          case 'in':
            return (
              value.includes(fieldValue.toString()) &&
              fieldValue
            );
          case 'nin':
            return (
              !value.includes(fieldValue.toString()) ||
              !fieldValue
            );
          case 'exists':
            return !!fieldValue;
          case 'nexists':
            return !fieldValue;
          case 'regex':
            return new RegExp(value).test(
              fieldValue.toString()
            );
          case 'nregex':
            return !new RegExp(value).test(
              fieldValue.toString()
            );
          default:
            return false;
        }
      });
      const isRuleValid =
        condition === 'AND'
          ? checkRules?.every((rule) => rule)
          : checkRules?.some((rule) => rule);

      return isVisibility === 'SHOW'
        ? isRuleValid
        : !isRuleValid;
    }
  );

  return visibilitiesCheck.every((check) => check);
};

export const useFormCondition = ({
  id,
  form,
  visibilities = [],
}: UseFormCondition) => {
  const formValues = Form.useWatch([], form);

  const visibility = useCallback((): boolean => {
    const currentVisibility = visibilities?.filter(
      (visibility) => visibility.target === id
    );

    if (!currentVisibility?.length) {
      return true;
    }

    return getVisibilityRules(
      currentVisibility,
      formValues
    );
  }, [id, formValues, visibilities]);

  return {
    isVisibility: visibility(),
  };
};

const getFormVisibility = ({
  id,
  form,
  visibilities,
}: UseFormCondition) => {
  const formValues = form.getFieldsValue();
  const visibility = (): boolean => {
    const currentVisibility = visibilities?.filter(
      (visibility) => visibility.target === id
    );

    if (!currentVisibility?.length) {
      return true;
    }

    return getVisibilityRules(
      currentVisibility,
      formValues
    );
  };
  return visibility();
};
