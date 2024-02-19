import { css } from '@emotion/css';
import {
  Card,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Switch,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/share-components/flex';
import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

type NotificationDetailProps = {
  form: FormInstance;
};

export const NotificationDetail = ({
  form,
}: NotificationDetailProps) => {
  const { t } = useTranslation();

  const customConfig =
    Form.useWatch('custom_config', form) ?? false;

  return (
    <Card
      title={
        <Flex
          alignItems="center"
          justifyContent="between"
        >
          <Flex flexDirection="column">
            <Typography>
              <IntlMessage id="logManagement.notificationSetting.notificationDetail" />
            </Typography>
            <Typography
              className={css`
                font-weight: 500;
                font-size: 14px;
              `}
            >
              <IntlMessage id="logManagement.notificationSetting.configurationMailServer" />
            </Typography>
          </Flex>

          <Form.Item
            className="mb-0"
            name="custom_config"
            initialValue={false}
            valuePropName="checked"
          >
            <Switch
              className="text-uppercase"
              checkedChildren={
                <IntlMessage id="logManagement.on" />
              }
              unCheckedChildren={
                <IntlMessage id="logManagement.off" />
              }
            />
          </Form.Item>
        </Flex>
      }
    >
      <Form.Item
        label={
          <IntlMessage id="logManagement.username" />
        }
        name={['configuration', 'username']}
        rules={
          customConfig
            ? [
                validation.required(
                  <IntlMessage id="logManagement.required" />
                ),
              ]
            : []
        }
      >
        <Input
          disabled={!customConfig}
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.username'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="logManagement.password" />
        }
        name={['configuration', 'password']}
        rules={
          customConfig
            ? [
                validation.required(
                  <IntlMessage id="logManagement.required" />
                ),
              ]
            : []
        }
      >
        <Input.Password
          disabled={!customConfig}
          autoComplete="new-password"
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.password'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="logManagement.hostname" />
        }
        name={['configuration', 'host']}
        rules={
          customConfig
            ? [
                validation.required(
                  <IntlMessage id="logManagement.required" />
                ),
              ]
            : []
        }
      >
        <Input
          disabled={!customConfig}
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.hostname'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        label={<IntlMessage id="logManagement.port" />}
        name={['configuration', 'port']}
        rules={
          customConfig
            ? [
                validation.required(
                  <IntlMessage id="logManagement.required" />
                ),
              ]
            : []
        }
      >
        <InputNumber
          className="w-100"
          disabled={!customConfig}
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.port'),
            }) as string
          }
        />
      </Form.Item>
    </Card>
  );
};
