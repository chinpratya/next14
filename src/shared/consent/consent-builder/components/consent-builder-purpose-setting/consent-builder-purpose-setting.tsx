import { Button, Drawer, Form, Input } from 'antd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { validation } from '@/utils';

export const ConsentBuilderPurposeSetting = () => {
  const [form] = Form.useForm();
  const {
    isOpenPurposeSetting,
    currentPurpose,
    onTogglePurposeSetting,
    onChangePurpose,
  } = useConsentBuilderStore();

  const handleSave = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onChangePurpose(values);
  };

  return (
    <Drawer
      title="Purpose Setting"
      placement="right"
      open={
        isOpenPurposeSetting && currentPurpose !== null
      }
      width={500}
      footer={
        <Button type="primary" block onClick={handleSave}>
          Save
        </Button>
      }
      onClose={() => onTogglePurposeSetting()}
      afterOpenChange={(visible) => {
        if (!visible) {
          form.resetFields();
        }
        if (visible && currentPurpose) {
          form.setFieldsValue(currentPurpose);
        }
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            validation.required(
              'Please input your purpose name!'
            ),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
