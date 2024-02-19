import { Flex } from '@mantine/core';
import { Form, Select, Typography } from 'antd';
import _ from 'lodash';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import {
  ConsentFormItemSectionType,
  ConsentVisibilityType,
} from '@/types';

export type VisibilityActionProps = {
  visibility: ConsentVisibilityType;
};

export const VisibilityAction = ({
  visibility,
}: VisibilityActionProps) => {
  const { formItems, currentFormIndex } =
    useConsentBuilderStore();

  const formSections = _.get(
    formItems,
    `[${currentFormIndex}].sections`,
    []
  );

  const components = _.flatMap(
    formSections,
    (section: ConsentFormItemSectionType) =>
      section?.components ?? []
  )
    ?.filter((component) =>
      ['field', 'identifier'].includes(
        (component?.type as string) ?? ''
      )
    )
    ?.filter(
      (component: Record<string, unknown>) =>
        !['uploads'].includes(component.widget as string)
    );

  const ruleConditionsId =
    visibility?.rules?.map((rule) => rule?.id) ?? [];

  return (
    <Form.Item
      label={
        <Typography.Title level={4} className="mb-0">
          การการทำ
        </Typography.Title>
      }
      tooltip={`เลือกฟิลด์ที่ต้องการแสดงหรือซ่อนเมื่อเงื่อนไขถูกต้อง`}
    >
      <Flex
        justify="space-between"
        align="center"
        className="w-100"
        gap={10}
      >
        <Form.Item className="w-50" name="isVisibility">
          <Select
            options={[
              {
                value: 'SHOW',
                label: 'Show',
              },
              {
                value: 'HIDE',
                label: 'Hide',
              },
            ]}
          />
        </Form.Item>
        <Form.Item className="w-50" name="target">
          <Select
            options={components
              ?.filter(
                (component) =>
                  !ruleConditionsId.includes(
                    component?.name as string
                  )
              )
              ?.map((component) => ({
                value: _.get(component, 'name'),
                label: _.get(component, 'label'),
              }))}
          />
        </Form.Item>
      </Flex>
    </Form.Item>
  );
};
