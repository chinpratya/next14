import {
  Button,
  Drawer,
  Form,
  Input,
  Typography,
} from 'antd';
import _ from 'lodash';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { validation } from '@/utils';

import { OptionsSetting } from './components/options-setting';
import { RequireSetting } from './components/require-setting';

const ALLOWED_PLACEHOLDER_WIDGET = [
  'input',
  'textarea',
  'select',
];

const INITIAL_WIDGET_PROPS = {
  options: [''],
  size: 'default',
};

export const ConsentBuilderActivityTypeSetting = () => {
  const [form] = Form.useForm();
  const {
    currentActivityType,
    openActivityTypeSetting,
    onToggleActivityTypeSetting,
    onChangeActivityType,
  } = useConsentBuilderStore();

  const currentWidget = _.get(
    currentActivityType,
    'widget',
    ''
  ) as string;

  const currentType = _.get(
    currentActivityType,
    'type',
    ''
  ) as string;

  const handleSave = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onChangeActivityType(values);
  };

  return (
    <Drawer
      title="Properties"
      placement="right"
      open={
        openActivityTypeSetting &&
        currentActivityType !== null
      }
      width={500}
      footer={
        <Button type="primary" block onClick={handleSave}>
          Save
        </Button>
      }
      onClose={() => onToggleActivityTypeSetting()}
      afterOpenChange={(visible) => {
        if (!visible) {
          form.resetFields();
        }
        if (visible && currentActivityType) {
          form.resetFields();
          form.setFieldsValue(currentActivityType);
        }
      }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          widgetProps: INITIAL_WIDGET_PROPS,
        }}
      >
        <Typography.Title level={3} className="mb-4">
          {currentType === 'identifier'
            ? 'ตัวระบุเจ้าของข้อมูล'
            : 'ข้อมูลพื้นฐาน'}
        </Typography.Title>
        <Form.Item
          label="หัวข้อ"
          name="label"
          rules={[
            validation.required('Please enter a label'),
          ]}
        >
          <Input />
        </Form.Item>
        {ALLOWED_PLACEHOLDER_WIDGET.includes(
          currentWidget
        ) && (
          <Form.Item
            label="คำอธิบายในช่องป้อนข้อมูล"
            name={['widgetProps', 'placeholder']}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="คำแนะนำหัวข้อ"
          name={['tooltip']}
        >
          <Input />
        </Form.Item>
        <Form.Item name="initialValue" hidden noStyle>
          <Input />
        </Form.Item>
        <RequireSetting />
        <OptionsSetting />
      </Form>
    </Drawer>
  );
};
