import { css } from '@emotion/css';
import {
  Collapse,
  Form,
  Input,
  Radio,
  Typography,
} from 'antd';
import { useEffect } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { ColorPicker } from '@components/color-picker';
import { Flex } from '@components/flex';
import { UploadImage } from '@components/upload-image';
import { IntlMessage } from '@utilComponents/intl-message';

import { SelectPurposeStyle } from './components/select-purpose-style';
import { SelectStyle } from './components/select-style';

export type ConsentBuilderFormContentProps = {
  isUsePurposeStyle?: boolean;
};

export const ConsentBuilderFormContent = ({
  isUsePurposeStyle = false,
}: ConsentBuilderFormContentProps) => {
  const [form] = Form.useForm();

  const { formSetting, onChangeFormSetting } =
    useConsentBuilderStore();

  useEffect(() => {
    form.setFieldsValue(formSetting);
    return () => {
      form.resetFields();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        page: {
          style: 'style-1',
          favicon: '',
          title: '',
        },
      }}
      onValuesChange={(changedValues) =>
        onChangeFormSetting(changedValues)
      }
    >
      <Collapse
        defaultActiveKey={[
          'style',
          'purpose-style',
          'favicon',
          'header',
          'background-style',
        ]}
      >
        <Collapse.Panel
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.style" />
          }
          key="style"
        >
          <Form.Item name={['page', 'style']}>
            <SelectStyle />
          </Form.Item>
        </Collapse.Panel>
        {isUsePurposeStyle && (
          <Collapse.Panel
            header={
              <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.purpose" />
            }
            key="purpose-style"
          >
            <Form.Item
              name={['form', 'purposeDisplayType']}
            >
              <SelectPurposeStyle />
            </Form.Item>
          </Collapse.Panel>
        )}
        <Collapse.Panel
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.favicon" />
          }
          key="favicon"
        >
          <Form.Item name={['page', 'favicon']}>
            <UploadImage
              module="consent-builder"
              group="form-content-page-favicon"
            />
          </Form.Item>
          <Form.Item
            label={
              <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.web" />
            }
            name={['page', 'title']}
            className={css`
              padding-bottom: 16px;
            `}
          >
            <Input />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.header" />
          }
          key="header"
        >
          <Form.Item name={['form', 'headerLogo']}>
            <UploadImage
              module="consent-builder"
              group="form-content-form-header-logo"
            />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent.background" />
          }
          key="background-style"
        >
          <Form.Item name={['page', 'backgroundStyle']}>
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
              prevValues?.page?.backgroundStyle !==
              curValues?.page?.backgroundStyle
            }
            noStyle
          >
            {({ getFieldValue }) => {
              const backgroundStyle = getFieldValue([
                'page',
                'backgroundStyle',
              ]);

              if (backgroundStyle === 'image') {
                return (
                  <Form.Item
                    name={['page', 'backgroundImage']}
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
                      name={['page', 'backgroundColor']}
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
