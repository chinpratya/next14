import _ from 'lodash';

import { PolicyFormFieldsForm } from '@/features/policy-management';

export const setValuesToPolicyForm = (
  values: Record<string, unknown>,
  formItems: PolicyFormFieldsForm[]
) =>
  formItems?.map((formItem) => {
    const key = Object.keys(values);
    return {
      ...formItem,
      section: formItem.section.map((section) => {
        return {
          ...section,
          component: section.component.map(
            (component) => {
              if (
                key.includes(
                  _.get(component, 'key') as string
                )
              ) {
                return {
                  ...component,
                  value: _.get(
                    values,
                    _.get(component, 'key') as string
                  ),
                };
              }
              return component;
            }
          ),
        };
      }),
    };
  });
