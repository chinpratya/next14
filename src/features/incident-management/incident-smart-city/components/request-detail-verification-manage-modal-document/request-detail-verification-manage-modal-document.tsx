import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
} from 'antd';

import validation from '@/utils/validation';
import { Flex } from '@components/flex';

type RequestDetailVerificationManageModalDocumentProps = {
  form: FormInstance;
};

export const RequestDetailVerificationManageModalDocument =
  ({
    form,
  }: RequestDetailVerificationManageModalDocumentProps) => {
    return (
      <Form form={form} layout="vertical">
        <Form.List
          name="document"
          initialValue={[{ name: '', description: '' }]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <>
                  <Flex
                    key={field.key}
                    justifyContent="between"
                    alignItems="center"
                  >
                    <>
                      <Form.Item
                        label="ชื่อ"
                        name={[field.name, 'name']}
                        className="w-50 mr-2"
                        rules={[
                          validation.required(
                            'กรุณากรอก ชื่อ'
                          ),
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="รายละเอียด"
                        name={[field.name, 'description']}
                        className="w-50 mr-2"
                      >
                        <Input />
                      </Form.Item>

                      {field.name !== 0 ? (
                        <DeleteOutlined
                          className="font-size-md"
                          onClick={() =>
                            remove(field.name)
                          }
                        />
                      ) : null}
                    </>
                  </Flex>
                  <Divider className="mt-0" />
                </>
              ))}
              <Form.Item>
                <Button
                  block
                  type="dashed"
                  icon={<PlusCircleOutlined />}
                  onClick={() => add()}
                >
                  เพิ่ม
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    );
  };
