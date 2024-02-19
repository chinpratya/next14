import {
  Col,
  Collapse,
  Form,
  FormInstance,
  Input,
  Radio,
  Switch,
  Typography,
} from 'antd';

import { ColorPicker } from '@components/color-picker';
import { Flex } from '@components/flex';
import { UploadImage } from '@components/upload-image';
import { IntlMessage } from '@utilComponents/intl-message';

import { PolicyBuilderFormContentSelectStyle } from './policy-builder-form-content-select-style';

export type PolicyBuilderFormContentProps = {
  form: FormInstance;
  hidden?: boolean;
};

export const PolicyBuilderFormContent = ({
  form,
  hidden,
}: PolicyBuilderFormContentProps) => {
  return (
    <Form
      hidden={hidden}
      form={form}
      layout="vertical"
      initialValues={{
        form_setting: {
          style: 'style-1',
          style_text: 'style-1',
          show_logo: false,
          header_logo: '',
        },
      }}
    >
      <Collapse
        defaultActiveKey={[
          'header',
          'style_policy',
          'style_text',
          'favicon',
          'background-style',
        ]}
      >
        <Collapse.Panel
          header={
            <IntlMessage id="policyManagement.builder.setting.header" />
          }
          key="header"
        >
          <Col>
            <Typography>
              <IntlMessage id="policyManagement.policy.detail.builder.formContent.showLogo" />
            </Typography>
            <Form.Item
              name={['form_setting', 'show_logo']}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Form.Item
            name={['form_setting', 'header_logo']}
          >
            <UploadImage
              module="policy-builder"
              group="form-content-form-header-logo"
            />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel
          header={
            <IntlMessage id="policyManagement.builder.setting.style" />
          }
          key="style_policy"
        >
          <Form.Item name={['form_setting', 'style']}>
            <PolicyBuilderFormContentSelectStyle style="stylePolicy" />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel
          header={
            <IntlMessage id="policyManagement.builder.setting.favicon" />
          }
          key="favicon"
        >
          <Form.Item
            label={
              <IntlMessage id="policyManagement.builder.setting.title" />
            }
            name={['form_setting', 'title']}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['form_setting', 'favicon']}>
            <UploadImage
              module="consent-builder"
              group="form-content-page-favicon"
            />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.background" />
          }
          key="background-style"
        >
          <Form.Item
            name={['form_setting', 'backgroundStyle']}
          >
            <Radio.Group>
              <Radio value="image">
                <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.background.image" />
              </Radio>
              <Radio value="color">
                <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.background.color" />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues?.form_setting
                ?.backgroundStyle !==
              curValues?.form_setting?.backgroundStyle
            }
            noStyle
          >
            {({ getFieldValue }) => {
              const backgroundStyle = getFieldValue([
                'form_setting',
                'backgroundStyle',
              ]);

              if (backgroundStyle === 'image') {
                return (
                  <Form.Item
                    name={[
                      'form_setting',
                      'backgroundImage',
                    ]}
                  >
                    <UploadImage
                      module="consent-builder"
                      group="form-content-form-background-image"
                    />
                  </Form.Item>
                );
              } else if (backgroundStyle === 'color') {
                return (
                  <Flex
                    alignItems="center"
                    justifyContent="between"
                  >
                    <Typography.Text className="mr-2">
                      <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.background.color" />{' '}
                      :
                    </Typography.Text>
                    <Form.Item
                      name={[
                        'form_setting',
                        'backgroundColor',
                      ]}
                      noStyle
                      valuePropName="color"
                    >
                      <ColorPicker />
                    </Form.Item>
                  </Flex>
                );
              } else {
                return null;
              }
            }}
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};
