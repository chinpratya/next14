import { Button, Drawer, Form, Input } from 'antd';
import { useEffect } from 'react';

import { usePolicyBuilderStore } from '@/stores/policy-builder';

export const PolicyBuilderFormSetting = () => {
  const [form] = Form.useForm();

  const {
    isShowSettingPolicySection,
    policySectionData,
    onToggleSettingPolicySection,
    onChangePolicySectionData,
  } = usePolicyBuilderStore();

  useEffect(() => {
    if (policySectionData) {
      form.setFieldsValue(policySectionData);
    }
  }, [policySectionData, form]);

  const handleSave = () => {
    const value = form.getFieldsValue();
    onChangePolicySectionData(value);
  };

  return (
    <Drawer
      title="Section Setting"
      placement="right"
      open={isShowSettingPolicySection}
      onClose={() => onToggleSettingPolicySection()}
      width={500}
      footer={
        <Button type="primary" block onClick={handleSave}>
          Save
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
