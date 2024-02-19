import { Form } from 'antd';
import type {
  FormItemProps as AntdFormItemProps,
  FormInstance,
} from 'antd';
import type { Rule } from 'antd/lib/form';
import _ from 'lodash';

import { FormItemWidget } from '@/types';

import {
  Checkbox,
  CheckboxProps,
} from './components/checkbox';
import {
  CheckboxGroup,
  CheckboxGroupProps,
} from './components/checkbox-group';
import {
  DatePicker,
  DatePickerProps,
} from './components/date-picker';
import { Images, ImageProps } from './components/image';
import {
  ImagesLink,
  ImageLinkProps,
} from './components/image-link';
import { Input, InputProps } from './components/input';
import {
  InputNumber,
  InputNumberProps,
} from './components/input-number';
import { Radio, RadioProps } from './components/radio';
import {
  RadioGroup,
  RadioGroupProps,
} from './components/radio-group';
import { Select, SelectProps } from './components/select';
import { Switch, SwitchProps } from './components/switch';
import {
  Textarea,
  TextAreaProps,
} from './components/textarea';
import {
  Uploads,
  UploadsProps,
} from './components/uploads';
import {
  VideoLive,
  VideoLiveProps,
} from './components/video-live';

export interface FormItemType extends AntdFormItemProps {
  widget: FormItemWidget;
  widgetProps?:
    | CheckboxProps
    | CheckboxGroupProps
    | DatePickerProps
    | InputProps
    | InputNumberProps
    | RadioProps
    | SelectProps
    | SwitchProps
    | TextAreaProps
    | UploadsProps
    | VideoLiveProps
    | ImageProps;
}

export const convertFormItemRules = (rules?: Rule[]) => {
  return rules
    ?.filter((rule) => !_.isEmpty(rule))
    ?.map((rule) => {
      if (_.get(rule, 'type') === 'email') {
        return {
          message: _.get(
            rule,
            'message',
            'กรุณากรอกอีเมลให้ถูกต้อง'
          ),
          pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        };
      }

      if (_.get(rule, 'type') === 'number') {
        return {
          message: _.get(
            rule,
            'message',
            'กรุณากรอกอีเมลให้ถูกต้อง'
          ),
          pattern: /^\d+$/g,
        };
      }
      return rule;
    });
};

export type FormBuilderProps = {
  formItems: FormItemType[];
  form?: FormInstance;
  isReadonly?: boolean;
};

export const FormBuilder = ({
  formItems,
  form,
  isReadonly,
}: FormBuilderProps) => {
  return (
    <Form layout="vertical" form={form}>
      {formItems.map((item, index) => {
        const key =
          item?.name?.toString() ??
          item?.id?.toString() ??
          index;

        const { widgetProps, rules, ...formItemProps } =
          item;

        const validateRules = convertFormItemRules(rules);

        return (
          <div key={key} className="w-100">
            {item.widget === 'checkbox' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
                valuePropName="checked"
              >
                <Checkbox
                  {...(widgetProps as CheckboxProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'checkbox-group' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <CheckboxGroup
                  {...(widgetProps as CheckboxGroupProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'date-picker' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <DatePicker
                  {...(widgetProps as DatePickerProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'input' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <Input
                  {...(widgetProps as InputProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'number' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={[
                  {
                    ...rules?.[0],
                    required: _.get(
                      rules?.[0],
                      'required',
                      false
                    ),
                  },
                ]}
              >
                <InputNumber
                  {...(widgetProps as InputNumberProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'radio' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <Radio
                  {...(widgetProps as RadioProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {['radio-group', 'accept'].includes(
              item.widget
            ) && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <RadioGroup
                  {...(widgetProps as RadioGroupProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {['radio-button-group'].includes(
              item.widget
            ) && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <RadioGroup
                  {...(widgetProps as RadioGroupProps)}
                  buttonStyle="solid"
                  optionType="button"
                  flexDirection="row"
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'select' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <Select
                  {...(widgetProps as SelectProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'switch' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
                valuePropName="checked"
              >
                <Switch
                  {...(widgetProps as SwitchProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'textarea' && (
              <Form.Item
                {...formItemProps}
                key={key}
                rules={validateRules}
              >
                <Textarea
                  {...(widgetProps as TextAreaProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'uploads' && (
              <Form.Item
                {...formItemProps}
                rules={[
                  {
                    ...rules?.[0],
                    required: _.get(
                      rules?.[0],
                      'required',
                      false
                    ),
                  },
                ]}
                key={key}
                valuePropName="fileList"
              >
                <Uploads
                  {...(widgetProps as UploadsProps)}
                  readOnly={isReadonly}
                />
              </Form.Item>
            )}
            {item.widget === 'image' && (
              <Form.Item {...formItemProps} key={key}>
                <Images
                  {...(widgetProps as ImageProps)}
                />
              </Form.Item>
            )}
            {item.widget === 'live' && (
              <Form.Item
                {...formItemProps}
                key={key}
                label="กล้อง"
              >
                <VideoLive
                  {...(widgetProps as VideoLiveProps)}
                />
              </Form.Item>
            )}

            {item.widget === 'image-link' && (
              <Form.Item
                {...formItemProps}
                key={key}
                label="รูปภาพ"
              >
                <ImagesLink
                  {...(widgetProps as ImageLinkProps)}
                />
              </Form.Item>
            )}
          </div>
        );
      })}
    </Form>
  );
};
