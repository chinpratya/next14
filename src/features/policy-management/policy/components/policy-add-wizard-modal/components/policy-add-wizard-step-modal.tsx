import {
  Collapse,
  Form,
  FormInstance,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useCallback } from 'react';

import { Flex } from '@components/flex';
import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';

const covertToFormItem = (
  items: Record<string, unknown>[]
) => {
  return items.map((item) => ({
    ...item,
    name: item.key,
    label: item.label,
    widgetProps: {
      options: item.options,
    },
  }));
};

const checkedSectionHasRequiredComponent = (
  section: Record<string, unknown>[]
) => {
  let hasRequired = false;
  _.forEach(section, (component) => {
    const rules = component.rules as Record<
      string,
      unknown
    >[];
    if (rules) {
      _.forEach(rules, (rule) => {
        if (rule?.required) {
          hasRequired = true;
        }
      });
    }
  });
  return hasRequired;
};

export type PolicyAddWizardStepModalProps = {
  form: FormInstance;
  formItem: Record<string, unknown>[];
  title?: string;
};

export type PolicyVisibilityCondition = {
  field: string;
  op: string;
  value: string;
};

export const PolicyAddWizardStepModal = ({
  form,
  formItem,
  title,
}: PolicyAddWizardStepModalProps) => {
  const formValues = Form.useWatch([], form);

  const validateComponentVisibilities = useCallback(
    (
      components: Record<string, unknown>[]
    ): Record<string, unknown>[] => {
      return components.filter((component) => {
        const visibilities =
          (component.visibility as Record<
            string,
            unknown
          >[]) ?? [];
        if (!visibilities.length) return true;

        const visible = visibilities?.map(
          (visibility) => {
            const action = visibility?.action as boolean;
            const conditions = _.get(
              visibility,
              'condition.all',
              []
            ) as PolicyVisibilityCondition[];

            const checkedConditions = conditions.map(
              (condition) => {
                const value = _.get(
                  formValues,
                  condition.field
                );
                if (
                  condition.op === 'is' &&
                  !_.isArray(value)
                ) {
                  return value === condition.value;
                }
                if (
                  condition.op === 'is' &&
                  _.isArray(value)
                ) {
                  return value.includes(condition.value);
                }
                return false;
              }
            );

            const isPassed =
              !checkedConditions.includes(false);

            return action ? isPassed : !isPassed;
          }
        );
        return visible?.every((v) => v);
      });
    },
    [formValues]
  );

  return (
    <>
      <Flex justifyContent="center" className="my-4">
        <h3>
          {title ??
            'องค์กรของท่าน มีการจัดเก็บข้อมูลส่วนบุคคลประเภทใดบ้าง'}
        </h3>
      </Flex>

      {validateComponentVisibilities(formItem)?.map(
        (item, index) => {
          const components =
            (item?.component as Record<
              string,
              unknown
            >[]) ?? [];

          const hasRules =
            checkedSectionHasRequiredComponent(
              components
            );

          return (
            <Collapse
              defaultActiveKey="1"
              key={index}
              className="mt-3"
            >
              {validateComponentVisibilities(components)
                .length > 0 ? (
                <Collapse.Panel
                  header={
                    (
                      <Typography>
                        <Flex>
                          {hasRules ? (
                            <Typography
                              style={{
                                color: 'red',
                                marginRight: '5px',
                              }}
                            >
                              *
                            </Typography>
                          ) : null}
                          {item?.section_name as string}
                        </Flex>
                      </Typography>
                    ) ?? ''
                  }
                  key="1"
                >
                  <FormBuilder
                    form={form}
                    formItems={
                      covertToFormItem(
                        validateComponentVisibilities(
                          components
                        )
                      ) as FormItemType[]
                    }
                  />
                </Collapse.Panel>
              ) : null}
            </Collapse>
          );
        }
      )}
    </>
  );
};
