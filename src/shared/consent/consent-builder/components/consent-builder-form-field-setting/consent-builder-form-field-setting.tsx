import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { validation } from '@/utils';

import { OptionsSetting } from './components/options-setting';
import { RequireSetting } from './components/require-setting';
import { SpecialSetting } from './components/special-setting';

const ALLOWED_SIZE_WIDGET = ['input', 'number'];

const ALLOWED_MAX_LENGTH_WIDGET = ['input'];

const ALLOWED_PLACEHOLDER_WIDGET = [
  'input',
  'textarea',
  'select',
];

const ALLOWED_OPTIONS = [
  'radio-group',
  'checkbox-group',
  'select',
];

const INITIAL_WIDGET_PROPS = {
  options: [''],
  size: 'default',
};

export const ConsentBuilderFormFieldSetting = () => {
  const [form] = Form.useForm();
  const {
    currentField,
    openFieldSetting,
    toggleFieldSetting,
    onChangeField,
  } = useConsentBuilderStore();

  const [defaultValue, setDefaultValue] = useState<
    number | number[] | string | string[]
  >();

  const currentWidget = _.get(
    currentField,
    'widget',
    ''
  ) as string;

  const currentType = _.get(
    currentField,
    'type',
    ''
  ) as string;

  const onInitialValueChange = (
    name: number | number[] | string | string[]
  ) => {
    setDefaultValue(name);
  };

  const handleSave = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    let initialValue = defaultValue ?? '';
    if (
      currentWidget === 'radio-group' &&
      typeof defaultValue === 'number'
    ) {
      initialValue =
        values?.widgetProps?.options[defaultValue] ?? '';
    }
    values['initialValue'] = initialValue;
    onChangeField(values);
  };

  useEffect(() => {
    if (_.get(currentField, 'widget') === 'radio-group') {
      const defaultOptionIndex = _.findIndex(
        _.get(currentField, 'widgetProps.options'),
        (option) =>
          option === _.get(currentField, 'initialValue')
      );
      setDefaultValue(defaultOptionIndex);
    }
  }, [currentField, openFieldSetting]);

  return (
    <Drawer
      title="Properties"
      placement="right"
      open={openFieldSetting && currentField !== null}
      width={500}
      footer={
        <Button type="primary" block onClick={handleSave}>
          Save
        </Button>
      }
      onClose={() => toggleFieldSetting()}
      afterOpenChange={(visible) => {
        if (!visible) {
          form.resetFields();
        }
        if (visible && currentField) {
          form.resetFields();
          form.setFieldsValue(currentField);
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
        {ALLOWED_SIZE_WIDGET.includes(currentWidget) && (
          <Form.Item
            label="ขนาดช่องป้อนข้อมูล"
            name={['widgetProps', 'size']}
          >
            <Radio.Group>
              <Radio.Button value="large">
                Large
              </Radio.Button>
              <Radio.Button value="default">
                Default
              </Radio.Button>
              <Radio.Button value="small">
                Small
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
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
        {ALLOWED_MAX_LENGTH_WIDGET.includes(
          currentWidget
        ) && (
          <Form.Item
            label="จำนวนคำสุงสุด"
            name={['widgetProps', 'maxLength']}
          >
            <InputNumber className="w-100" min={0} />
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
        {currentWidget === 'number' && (
          <>
            <Form.Item
              label="สไตล์ตัวเลข"
              name={['widgetProps', 'formatter']}
            >
              <Input />
            </Form.Item>
            <Form.Item label="ต่ำสุด" name={['min']}>
              <InputNumber className="w-100" />
            </Form.Item>
            <Form.Item label="สูงสุด" name={['max']}>
              <InputNumber className="w-100" />
            </Form.Item>
          </>
        )}
        <RequireSetting />
        {currentWidget === 'input' && <SpecialSetting />}
        {currentWidget === 'uploads' && (
          <Form.Item
            label="สไตล์อัพโหลด"
            name={['widgetProps', 'uploadStyle']}
          >
            <Select
              options={[
                {
                  label: 'Drag and Drop',
                  value: 'drag',
                },
                {
                  label: 'Button',
                  value: 'button',
                },
              ]}
            />
          </Form.Item>
        )}
        {ALLOWED_OPTIONS.includes(currentWidget) && (
          <OptionsSetting
            widget={currentWidget}
            initialValue={defaultValue}
            onInitialValueChange={onInitialValueChange}
          />
        )}
      </Form>
    </Drawer>
  );
};
