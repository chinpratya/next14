import { Form, Input } from 'antd';

import { validation } from '@/utils';
import { Flex } from '@components/flex';

export const OptionsSetting = () => {
  return (
    <Form.Item label="Options" required>
      <Form.List name={['widgetProps', 'options']}>
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              return (
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
                    <Input placeholder="กรอกตัวเลือก" />
                  </Form.Item>
                </Flex>
              );
            })}
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};
