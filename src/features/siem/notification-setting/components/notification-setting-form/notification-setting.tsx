import { Card, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

type NotificationSettingProps = {
  type?: string;
  isEditor?: boolean;
  isDefault?: boolean;
};

export const NotificationSetting = ({
  type,
  isEditor,
  isDefault,
}: NotificationSettingProps) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage id="logManagement.notificationSetting.title" />
      }
    >
      <Form.Item
        label={
          <IntlMessage id="logManagement.notificationSetting.name" />
        }
        name="name"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          disabled={isDefault}
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.name'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="logManagement.notificationSetting.notificationType" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
        ]}
        name="provider"
        initialValue="EMAIL"
      >
        <Select
          options={
            isEditor && isDefault
              ? [
                  {
                    label: t(
                      'logManagement.notificationSetting.line'
                    ),
                    value: 'LINE',
                  },
                ]
              : [
                  {
                    label: t('logManagement.email'),
                    value: 'EMAIL',
                  },
                  {
                    label: t(
                      'logManagement.notificationSetting.line'
                    ),
                    value: 'LINE',
                  },
                ]
          }
          disabled={isDefault}
        />
      </Form.Item>
      {(type === 'EMAIL' ||
        (type === 'DEFAULT' && isDefault)) && (
        <Form.Item
          label={<IntlMessage id="logManagement.email" />}
          name="sender"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
            {
              validator: (rule, value) => {
                if (value.length > 0) {
                  for (const email of value) {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        email
                      )
                    ) {
                      return Promise.reject(
                        'กรุณากรอกอีเมล์ให้ถูกต้อง'
                      );
                    }
                  }
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Select
            mode="tags"
            placeholder={
              t('logManagement.placeholder', {
                field: t('logManagement.email'),
              }) as string
            }
          />
        </Form.Item>
      )}
      {type === 'LINE' && (
        <Form.Item
          label={
            <IntlMessage id="logManagement.notificationSetting.lineToken" />
          }
          name={['configuration', 'access_token']}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Input
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'logManagement.notificationSetting.lineToken'
                ),
              }) as string
            }
          />
        </Form.Item>
      )}
    </Card>
  );
};
