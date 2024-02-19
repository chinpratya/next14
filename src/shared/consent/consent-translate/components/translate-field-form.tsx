import { Divider, Form, Input, Typography } from 'antd';
import type { FormInstance } from 'antd/es/form';

import { validation } from '@/utils';

import { TranslateEmpty } from './translate-empty';

export type TranslateFieldFormProps = {
  currentLanguage?: string;
  form?: FormInstance;
};

export const TranslateFieldForm = ({
  currentLanguage,
  form,
}: TranslateFieldFormProps) => {
  if (!currentLanguage) {
    return <TranslateEmpty />;
  }

  const disabled = currentLanguage === 'default';

  return (
    <div className="p-4">
      <Form layout="vertical" form={form}>
        <Form.Item
          label="ชื่อ"
          name={[currentLanguage, 'label']}
          rules={[validation.required('กรุณากรอกชื่อ')]}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="คำอธิบายในช่องป้อนข้อมูล"
          name={[currentLanguage, 'placeholder']}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="คำแนะนำหัวข้อ"
          name={[currentLanguage, 'tooltip']}
        >
          <Input disabled={disabled} />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) => {
            return (
              prevValues[currentLanguage]?.rules?.[0]
                ?.required !==
              currentValues[currentLanguage]?.rules?.[0]
                ?.required
            );
          }}
        >
          {({ getFieldValue }) => {
            const isRequired = getFieldValue([
              currentLanguage,
              'rules',
              0,
              'required',
            ]);

            if (!isRequired) {
              return null;
            }

            return (
              <Form.Item
                label="ข้อความแจ้งเตือน"
                name={[
                  currentLanguage,
                  'rules',
                  0,
                  'message',
                ]}
                rules={[
                  validation.required(
                    'กรุณากรอกข้อความแจ้งเตือน'
                  ),
                ]}
              >
                <Input disabled={disabled} />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.List
          name={[
            currentLanguage,
            'widgetProps',
            'options',
          ]}
        >
          {(fields) => (
            <>
              {fields.length > 0 && (
                <>
                  <Divider />
                  <Typography.Title
                    level={4}
                    className="font-weight-bold mb-2"
                  >
                    ตัวเลือก
                  </Typography.Title>
                </>
              )}
              {fields.map((field) => (
                <Form.Item
                  {...field}
                  key={field.key}
                  rules={[
                    validation.required(
                      `กรุณากรอกตัวเลือกข้อที่ ${
                        field.key + 1
                      }`
                    ),
                  ]}
                >
                  <Input disabled={disabled} />
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
