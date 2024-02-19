import { useMediaQuery } from '@mantine/hooks';
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { validation } from '@/utils';

import { OptionsSetting } from './components/options-setting';

const INITIAL_WIDGET_PROPS = {
  options: [''],
  size: 'default',
};

export const ConsentBuilderRequestTypeDsarSetting =
  () => {
    const [form] = Form.useForm();

    const isMobile = useMediaQuery('(max-width: 768px)');

    const {
      currentRequestTypeDsar,
      openRequestTypeDsarSetting,
      toggleRequestTypeDsarSetting,
      onChangeRequestTypeDsar,
    } = useConsentBuilderStore();

    const handleSave = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();

      onChangeRequestTypeDsar(values);
    };

    return (
      <Drawer
        title="Properties"
        placement="right"
        open={
          openRequestTypeDsarSetting &&
          currentRequestTypeDsar !== null
        }
        width={isMobile ? '100vw' : 750}
        footer={
          <Button
            type="primary"
            block
            onClick={handleSave}
          >
            Save
          </Button>
        }
        onClose={() => toggleRequestTypeDsarSetting()}
        afterOpenChange={(visible) => {
          if (!visible) {
            form.resetFields();
          }
          if (visible && currentRequestTypeDsar) {
            form.setFieldsValue(currentRequestTypeDsar);
          }
        }}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            description: '',
            lawUrl: '',
            widgetProps: INITIAL_WIDGET_PROPS,
          }}
        >
          <Typography.Title level={3} className="mb-4">
            ข้อมูลพื้นฐาน
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
          <Form.Item
            label="รายละเอียด"
            name="description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="คำแนะนำหัวข้อ"
            name={['tooltip']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ลิงค์กฏหมายที่เกี่ยวข้อง"
            name="lawUrl"
            rules={[validation.url()]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="สไตล์" name="widget">
            <Select
              options={[
                { label: 'Radio', value: 'radio-group' },
                { label: 'Select', value: 'select' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="คำอธิบายในช่องป้อนข้อมูล"
            name={['widgetProps', 'placeholder']}
          >
            <Input />
          </Form.Item>
          <OptionsSetting />
        </Form>
      </Drawer>
    );
  };
