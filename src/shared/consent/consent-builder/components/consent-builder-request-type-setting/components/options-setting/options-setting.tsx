import { Form, Input, Select } from 'antd';

import { useListWorkflow } from '@/features/dsar-automation';
import { validation } from '@/utils';
import { Flex } from '@components/flex';

export const OptionsSetting = () => {
  const { data } = useListWorkflow({});

  const options = data?.data
    ?.filter((workflow) =>
      ['publish'].includes(workflow.status.toLowerCase())
    )
    .map((workflow) => {
      return {
        label: workflow.name,
        value: workflow.workflowID,
      };
    });

  return (
    <Form.Item label="Options" required>
      <Form.List name={['widgetProps', 'options']}>
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Flex
                key={key}
                justifyContent={'center'}
                alignItems="center"
                className="mb-2"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'base']}
                  className="w-100 mb-0 mr-2"
                  rules={[
                    validation.required(
                      'กรุณากรอกตัวเลือก'
                    ),
                  ]}
                >
                  <Input
                    placeholder="กรอกตัวเลือก"
                    className="w-100"
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'workflow']}
                  className="w-100 mb-0 mr-2"
                  rules={[
                    validation.required(
                      'กรุณากรอกตัวเลือก'
                    ),
                  ]}
                >
                  <Select
                    placeholder="กรอกตัวเลือก"
                    options={options ?? []}
                    className="w-100"
                  />
                </Form.Item>
              </Flex>
            ))}
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};
