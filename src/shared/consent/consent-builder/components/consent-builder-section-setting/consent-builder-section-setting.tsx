import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
} from 'antd';

import { useConsentBuilderStore } from '@/stores/consent-builder';

export const ConsentBuilderSectionSetting = () => {
  const {
    isOpenSectionSetting,
    currentSection,
    onToggleSectionSetting,
    onChangeSectionSetting,
  } = useConsentBuilderStore();

  const [form] = Form.useForm();

  const handleSave = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onChangeSectionSetting(values);
    onToggleSectionSetting();
  };

  return (
    <Drawer
      title="Section Setting"
      placement="right"
      open={isOpenSectionSetting}
      onClose={() => onToggleSectionSetting()}
      width={500}
      footer={
        <Button type="primary" block onClick={handleSave}>
          Save
        </Button>
      }
      afterOpenChange={(open) => {
        if (!open) {
          form.resetFields();
        } else {
          form.setFieldsValue(currentSection);
        }
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Section Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a section name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Setting">
          <Form.Item
            name={['properties', 'isHidden']}
            valuePropName="checked"
          >
            <Checkbox>Hide</Checkbox>
          </Form.Item>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
