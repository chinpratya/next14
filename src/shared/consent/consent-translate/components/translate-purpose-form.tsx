import { Divider, Form, FormInstance, Input } from 'antd';

import { validation } from '@/utils';

import { TranslateEmpty } from './translate-empty';

export type TranslatePurposeFormProps = {
  form?: FormInstance;
  currentLanguage?: string;
};

export const TranslatePurposeForm = ({
  form,
  currentLanguage,
}: TranslatePurposeFormProps) => {
  if (!currentLanguage) {
    return <TranslateEmpty />;
  }

  const disabled = currentLanguage === 'default';

  return (
    <div className="p-4">
      <Form layout="vertical" form={form}>
        <Form.Item
          label="ชื่อ"
          name={[currentLanguage, 'name']}
          rules={[validation.required('กรุณากรอกชื่อ')]}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="รายละเอียด"
          name={[currentLanguage, 'description']}
        >
          <Input.TextArea rows={4} disabled={disabled} />
        </Form.Item>
        <Form.List
          name={[currentLanguage, 'preferences']}
        >
          {(fields) => {
            return fields.map((field) => {
              return (
                <div key={field.key}>
                  <Divider />
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    label="ชื่อ"
                    rules={[
                      validation.required(
                        'กรุณากรอกชื่อ'
                      ),
                    ]}
                  >
                    <Input disabled={disabled} />
                  </Form.Item>

                  <Form.List
                    name={[field.name, 'choices']}
                  >
                    {(fields) => {
                      if (fields.length === 0)
                        return null;

                      return (
                        <Form.Item label="ตัวเลือก">
                          {fields?.map((field) => {
                            return (
                              <Form.Item
                                {...field}
                                key={field.key}
                                name={[field.name]}
                                rules={[
                                  validation.required(
                                    'กรุณากรอกตัวเลือก'
                                  ),
                                ]}
                              >
                                <Input
                                  disabled={disabled}
                                />
                              </Form.Item>
                            );
                          })}
                        </Form.Item>
                      );
                    }}
                  </Form.List>
                </div>
              );
            });
          }}
        </Form.List>
      </Form>
    </div>
  );
};
