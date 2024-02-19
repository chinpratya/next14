import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Form,
  FormListFieldData,
  Input,
  Select,
} from 'antd';
import _ from 'lodash';

import { FormItemType } from '@components/form-builder';

export type VisibilityRuleProps = {
  field: FormListFieldData;
  remove: (name: number | number[]) => void;
  components?: FormItemType[];
};

const operators = [
  {
    value: 'eq',
    label: 'เท่ากับ',
    useFor: ['input', 'number', 'select', 'radio-group'],
  },
  {
    value: 'neq',
    label: 'ไม่เท่ากับ',
    useFor: ['input', 'number', 'select', 'radio-group'],
  },
  {
    value: 'gt',
    label: 'มากกว่า',
    useFor: ['number'],
  },
  {
    value: 'gte',
    label: 'มากกว่าหรือเท่ากับ',
    useFor: ['number'],
  },
  {
    value: 'lt',
    label: 'น้อยกว่า',
    useFor: ['number'],
  },
  {
    value: 'lte',
    label: 'น้อยกว่าหรือเท่ากับ',
    useFor: ['number'],
  },
  {
    value: 'in',
    label: 'อยู่ใน',
    useFor: ['checkbox-group', 'input'],
  },
  {
    value: 'nin',
    label: 'ไม่อยู่ใน',
    useFor: ['checkbox-group', 'input'],
  },
];

export const VisibilityRule = ({
  field,
  remove,
  components = [],
}: VisibilityRuleProps) => {
  return (
    <Flex
      key={field.key}
      gap={8}
      wrap="wrap"
      justify="space-between"
      className={css`
        margin-bottom: 24px;

        .rules__component {
          margin-bottom: 0;
          width: 28%;
          min-width: 50px;

          @media (max-width: 768px) {
            width: 100%;
          }
        }
      `}
    >
      <Form.Item
        className="mb-0 rules__component"
        name={[field.name, 'id']}
      >
        <Select
          className="w-100"
          options={components.map((component) => ({
            value: component?.name,
            label: component?.label,
          }))}
        />
      </Form.Item>
      <Form.Item
        className="rules__component"
        shouldUpdate={(prev, current) =>
          _.get(prev, `rules.${field.name}.id`) !==
          _.get(current, `rules.${field.name}.id`)
        }
      >
        {({ getFieldValue }) => {
          const id = getFieldValue([
            'rules',
            field.name,
            'id',
          ]);

          const component = components.find(
            (component) => component.name === id
          );

          return (
            <Form.Item
              name={[field.name, 'operator']}
              className="mb-0"
            >
              <Select
                disabled={!component}
                options={operators
                  .filter((operator) =>
                    component
                      ? operator?.useFor?.includes(
                          component?.widget
                        )
                      : true
                  )
                  .map((operator) => ({
                    value: operator.value,
                    label: operator.label,
                  }))}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item
        className="rules__component"
        shouldUpdate={(prev, current) =>
          _.get(prev, `rules.${field.name}.id`) !==
          _.get(current, `rules.${field.name}.id`)
        }
      >
        {({ getFieldValue }) => {
          const id = getFieldValue([
            'rules',
            field.name,
            'id',
          ]);

          const component = components.find(
            (component) => component.name === id
          );

          if (!component) {
            return <Input disabled />;
          }

          return (
            <Form.Item
              name={[field.name, 'value']}
              className="mb-0"
            >
              {[
                'checkbox-group',
                'radio-group',
                'select',
              ].includes(component.widget) ? (
                <Select
                  options={
                    _.get(
                      component,
                      'widgetProps.options',
                      []
                    )?.map((option: unknown) => ({
                      value: _.get(
                        option,
                        'base',
                        option
                      ),
                      label: _.get(
                        option,
                        'base',
                        option
                      ),
                    })) ?? []
                  }
                />
              ) : (
                <Input />
              )}
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item {...field} className="mb-0">
        <DeleteOutlined
          onClick={() => remove(field.name)}
        />
      </Form.Item>
    </Flex>
  );
};
