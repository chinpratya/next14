import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { validation } from '@/utils';
import { Flex } from '@components/flex';

export const OptionsSetting = () => {
  return (
    <Form.Item label="Options" required>
      <Form.List name={['widgetProps', 'options']}>
        {(fields, { add, remove }) => (
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
                  name={name}
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
                  />
                </Form.Item>
                {fields.length > 1 && (
                  <DeleteOutlined
                    onClick={() => remove(name)}
                  />
                )}
              </Flex>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusCircleOutlined />}
              >
                เพิ่มตัวเลือก
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};
