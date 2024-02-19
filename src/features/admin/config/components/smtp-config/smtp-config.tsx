import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { common } from '@/lang/tokens/common';
import { useNotifications } from '@/stores/notifications';
import { getColLayout, validation } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetSmtpConfig } from '../../api/get-smtp-config';
import { useUpdateSMTPConfig } from '../../api/update-smtp-config';

export const SmtpConfig = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const updateSMTPConfig = useUpdateSMTPConfig({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.smtp.update'
        ) as string,
      });
    },
  });

  const { data, isLoading, isError } = useGetSmtpConfig();

  const onUpdateSMTPConfig = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateSMTPConfig.submit(values);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      SMTP_PASSWORD: undefined,
    });
  }, [data, form]);

  return (
    <FallbackError isError={isError}>
      <Card
        loading={isLoading}
        title={
          <IntlMessage id="admin.config.smtp.general" />
        }
        extra={
          <Button
            type="primary"
            onClick={onUpdateSMTPConfig}
            loading={updateSMTPConfig.isLoading}
          >
            <IntlMessage id={common.save} />
          </Button>
        }
      >
        <Row>
          <Col {...getColLayout(12)}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                SMTP_SENDER_NAME: '',
                SMTP_SENDER: '',
                SMTP_HOST: '',
                SMTP_USERNAME: '',
                SMTP_PASSWORD: '',
                SMTP_PORT: '',
                SMTP_LTS: false,
                SMTP_SSL: false,
              }}
            >
              <Form.Item
                label={
                  <IntlMessage id="admin.config.smtp.senderName" />
                }
                name="SMTP_SENDER_NAME"
                rules={[
                  validation.required(
                    t(
                      'admin.config.smtp.senderNameRequired'
                    )
                  ),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <IntlMessage id="admin.config.smtp.senderEmail" />
                }
                name="SMTP_SENDER"
                rules={[
                  validation.required(
                    t(
                      'admin.config.smtp.senderEmailRequired'
                    )
                  ),
                  validation.email(),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <IntlMessage id="admin.config.smtp.host" />
                }
                name="SMTP_HOST"
                rules={[validation.url()]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <IntlMessage id="admin.config.smtp.username" />
                }
                name="SMTP_USERNAME"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <IntlMessage id="admin.config.smtp.password" />
                }
                name="SMTP_PASSWORD"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label={
                  <IntlMessage id="admin.config.smtp.port" />
                }
                name="SMTP_PORT"
                className="mb-0"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="SMTP_LTS"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox>
                  <IntlMessage id="admin.config.smtp.auto" />
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="SMTP_SSL"
                valuePropName="checked"
                className="mb-0"
              >
                <Checkbox>
                  <IntlMessage id="admin.config.smtp.authentication" />
                </Checkbox>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </FallbackError>
  );
};
