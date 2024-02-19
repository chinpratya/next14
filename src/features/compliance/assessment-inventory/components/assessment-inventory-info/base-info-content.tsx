import {
  Card,
  Form,
  Input,
  Select,
  FormInstance,
} from 'antd';
import { useEffect } from 'react';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssessmentInventory } from '../../types';

const { TextArea } = Input;

type BaseInfoContentProps = {
  data: AssessmentInventory | null;
  form: FormInstance;
  loading: boolean;
};
export const BaseInfoContent = ({
  data,
  form,
  loading,
}: BaseInfoContentProps) => {
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    return () => {
      form.resetFields();
    };
  }, [data, form]);

  return (
    <Card
      title={
        <IntlMessage id="compliance.assessmentInventory.basicInfo" />
      }
      loading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentInventory.name" />
          }
          name="name"
          rules={[validation.required('ชื่อแบบประเมิน')]}
        >
          <Input disabled placeholder="ชื่อแบบประเมิน" />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentInventory.group" />
          }
          name="group"
          rules={[validation.required('ประภทแบบประเมิน')]}
        >
          <Select
            disabled
            mode="tags"
            placeholder="ประเภทแบบประเมิน"
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentInventory.description" />
          }
          name="description"
        >
          <TextArea disabled rows={6} />
        </Form.Item>
      </Form>
    </Card>
  );
};
