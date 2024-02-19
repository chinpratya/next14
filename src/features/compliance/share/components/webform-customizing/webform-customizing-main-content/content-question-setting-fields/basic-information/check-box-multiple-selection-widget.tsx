import {
  Form,
  InputNumber,
  Select,
  Typography,
} from 'antd';

import validation from '@/utils/validation';
import { Flex } from '@components/flex';

export const CheckBoxMultipleSelectionWidget = () => {
  const options = [
    {
      label: 'ตอบได้ไม่จำกัด',
      value: 'unlimited',
    },
    {
      label: 'ระบุตัวเลขที่ต้องกรอก',
      value: 'exactNumber',
    },
    {
      label: 'ระบุช่วงคำตอบ',
      value: 'range',
    },
  ];

  return (
    <>
      <Form.Item
        label="Multiple selection"
        name="multipleSelection"
        rules={[
          validation.required('multiple selection'),
        ]}
      >
        <Select options={options} />
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.multipleSelection !==
            currentValues.multipleSelection ||
          prevValues.options !== currentValues.options
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const multipleSelection = getFieldValue(
            'multipleSelection'
          );

          const options = getFieldValue('options');

          if (multipleSelection === 'exactNumber') {
            return (
              <Form.Item
                name="count"
                rules={[
                  validation.required(
                    'multiple selection count'
                  ),
                ]}
              >
                <InputNumber
                  min={0}
                  max={options?.length}
                  className="w-100"
                />
              </Form.Item>
            );
          }

          if (multipleSelection === 'range') {
            return (
              <Flex
                justifyContent="between"
                alignItems="center"
              >
                <Form.Item
                  name="min"
                  rules={[validation.required('min')]}
                >
                  <InputNumber
                    min={0}
                    max={options?.length - 1}
                    className="w-100"
                  />
                </Form.Item>
                <Typography.Text
                  className="mb-4"
                  type="secondary"
                >
                  -
                </Typography.Text>
                <Form.Item
                  name="max"
                  rules={[validation.required('max')]}
                >
                  <InputNumber
                    min={0}
                    max={options?.length}
                    className="w-100"
                  />
                </Form.Item>
              </Flex>
            );
          }

          return null;
        }}
      </Form.Item>
    </>
  );
};
