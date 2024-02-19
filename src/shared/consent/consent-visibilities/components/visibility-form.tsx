import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useCallback } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import {
  ConsentFormItemSectionType,
  ConsentVisibilityType,
} from '@/types';
import { FormItemType } from '@components/form-builder';

import { VisibilityAction } from './visibility-action';
import { VisibilityRule } from './visibility-rule';
import { WorkflowAction } from './workflow-action';

export type VisibilityFormProps = {
  visibility: ConsentVisibilityType;
};

export const VisibilityForm = ({
  visibility,
}: VisibilityFormProps) => {
  const { formItems, currentFormIndex, updateCondition } =
    useConsentBuilderStore();

  const [form] = Form.useForm();

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
      [
        'field',
        'identifier',
        'request-type',
        'request-type-dsar',
      ].includes((component?.type as string) ?? '')
    )
    ?.filter(
      (component: Record<string, unknown>) =>
        !['uploads', 'textarea'].includes(
          component.widget as string
        )
    );

  const onUpdateVisibility = useCallback(
    (
      changedValue: Record<string, unknown>,
      values: Record<string, unknown>
    ) => {
      const condition = {
        ...visibility,
        ...values,
      };

      const rules = condition?.rules?.map(
        (rule) => rule?.id
      );
      if (rules?.includes(condition.target)) {
        condition.target = '';
        form.setFieldsValue(condition);
      }
      updateCondition(visibility.id, condition);
    },
    [form, updateCondition, visibility]
  );

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={onUpdateVisibility}
      initialValues={visibility}
    >
      <Form.Item label="ชื่อกฎ" name="name">
        <Input />
      </Form.Item>
      <Divider />
      <Form.Item
        label={
          <Typography.Title level={4} className="mb-0">
            เงื่อนไข
          </Typography.Title>
        }
        tooltip={`เลือกฟิลด์ที่ต้องการใช้เป็นเงื่อนไข`}
        className="mb-0"
      >
        <Flex gap={10}>
          <Form.Item
            style={{
              width: 150,
            }}
            name="condition"
          >
            <Select
              options={[
                {
                  value: 'AND',
                  label: 'ALL',
                },
                {
                  value: 'OR',
                  label: 'ANY',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            className="w-100"
            shouldUpdate={(prev, current) =>
              prev.condition !== current.condition
            }
          >
            {({ getFieldValue }) => {
              const condition =
                getFieldValue('condition');

              if (condition === 'OR') {
                return (
                  <Typography.Text>
                    ตรงตามเงื่อนไขใด ๆ ดังต่อไปนี้
                  </Typography.Text>
                );
              }

              return (
                <Typography.Text>
                  ตรงตามเงื่อนไขทั้งหมดดังต่อไปนี้
                </Typography.Text>
              );
            }}
          </Form.Item>
        </Flex>
      </Form.Item>
      <Form.List name="rules">
        {(fields, { add, remove }) => (
          <>
            {fields?.map((field) => (
              <VisibilityRule
                key={`visibility-rule-${field.key}`}
                field={field}
                remove={remove}
                components={
                  components as unknown as FormItemType[]
                }
              />
            ))}
            <Button
              type="dashed"
              onClick={() => add()}
              block
              className="mb-4"
              icon={<PlusOutlined />}
            >
              เพิ่ม
            </Button>
          </>
        )}
      </Form.List>
      {visibility?.type === 'workflow' ? (
        <WorkflowAction />
      ) : (
        <VisibilityAction visibility={visibility} />
      )}
    </Form>
  );
};
