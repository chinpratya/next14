import _ from 'lodash';

import {
  ConsentFormItemType,
  ConsentPurposeType,
} from '@/types';

export const setConsentPurposeValues = (
  values: Record<string, unknown>,
  purpose: ConsentPurposeType,
  parentName?: string
): ConsentPurposeType => {
  const rootName = parentName
    ? `${parentName}.${purpose.purposeID}`
    : purpose.purposeID;

  const isAccepted = _.get(
    values,
    `${rootName}.isAccepted`,
    false
  ) as boolean;

  return {
    ...purpose,
    isAccepted,
    preferences: purpose.preferences.map(
      (preference) => ({
        ...preference,
        value: isAccepted
          ? _.get(
              values,
              `${rootName}.${preference.id}`,
              preference.value
            )
          : undefined,
      })
    ),
  };
};

export const setValuesToConsentForm = (
  values: Record<string, unknown>,
  formItems: ConsentFormItemType[]
): ConsentFormItemType[] =>
  formItems.map((formItem) => {
    return {
      ...formItem,
      sections: formItem.sections.map((section) => {
        return {
          ...section,
          components: section.components.map(
            (component) => {
              if (
                [
                  'field',
                  'request-type',
                  'request-type-dsar',
                  'identifier',
                  'activity-type',
                ].includes(
                  _.get(component, 'type') as string
                )
              ) {
                return {
                  ...component,
                  value: _.get(
                    values,
                    _.get(component, 'name') as string
                  ),
                };
              }
              if (
                _.get(component, 'type') === 'purpose'
              ) {
                return setConsentPurposeValues(
                  values,
                  component as unknown as ConsentPurposeType
                );
              }
              if (
                _.get(component, 'type') === 'activity'
              ) {
                const purposes = _.get(
                  component,
                  'purposes'
                ) as ConsentPurposeType[];

                return {
                  ...component,
                  purposes: purposes.map((purpose) =>
                    setConsentPurposeValues(
                      values,
                      purpose,
                      _.get(
                        component,
                        'activityID'
                      ) as string
                    )
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

export const getConsentPurposeValues = (
  purpose: ConsentPurposeType
): Record<string, unknown> => {
  const values: Record<string, unknown> = {};
  values['isAccepted'] = purpose.isAccepted;
  purpose.preferences.forEach((preference) => {
    values[`${preference.id}`] = preference.value;
  });
  return values;
};

export const getValuesFromConsentForm = (
  formItems?: ConsentFormItemType[]
): Record<string, unknown> => {
  const values: Record<string, unknown> = {};
  formItems?.forEach((formItem) => {
    formItem?.sections?.forEach((section) => {
      section?.components?.forEach((component) => {
        if (
          [
            'field',
            'request-type',
            'request-type-dsar',
            'identifier',
            'activity-type',
          ].includes(_.get(component, 'type') as string)
        ) {
          _.set(
            values,
            _.get(component, 'name') as string,
            _.get(
              component,
              'value',
              _.get(component, 'initialValue', '')
            )
          );
        }

        if (_.get(component, 'type') === 'purpose') {
          const purpose =
            component as unknown as ConsentPurposeType;
          _.set(
            values,
            `${purpose.purposeID}`,
            getConsentPurposeValues(purpose)
          );
        }

        if (_.get(component, 'type') === 'activity') {
          const activity = component as unknown as {
            activityID: string;
            purposes: ConsentPurposeType[];
          };
          activity.purposes.forEach((purpose) => {
            _.set(
              values,
              `${activity.activityID}.${purpose.purposeID}`,
              getConsentPurposeValues(purpose)
            );
          });
        }

        return component;
      });
    });
  });
  return values;
};
