import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';

import { validation } from '@/utils';
import { Flex } from '@components/flex';

export type OptionsSettingProps = {
  widget: string;
  initialValue?: number | number[] | string | string[];
  onInitialValueChange?: (
    name: number | number[]
  ) => void;
};

export const OptionsSetting = ({
  widget,
  initialValue,
  onInitialValueChange,
}: OptionsSettingProps) => {
  return (
    <Form.Item label="Options" required>
      <Form.List name={['widgetProps', 'options']}>
        {(fields, { add, remove }) => (
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
                    name={[name]}
                    className="w-100 mb-0 mr-2"
                    rules={[
                      validation.required(
                        'กรุณากรอกตัวเลือก'
                      ),
                    ]}
                  >
                    <Input placeholder="กรอกตัวเลือก" />
                  </Form.Item>
                  {['radio-group'].includes(widget) && (
                    <Radio
                      checked={initialValue === name}
                      onClick={() => {
                        onInitialValueChange?.(name);
                      }}
                    />
                  )}
                  {fields.length > 1 && (
                    <DeleteOutlined
                      onClick={() => remove(name)}
                    />
                  )}
                </Flex>
              );
            })}
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
