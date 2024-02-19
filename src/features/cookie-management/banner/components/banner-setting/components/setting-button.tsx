import {
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Switch,
  Typography,
} from 'antd';
import { useContext } from 'react';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { BannerContext } from '../../banner-context-provider';

export const SettingButton = () => {
  const bannerContext = useContext(BannerContext);
  const currentLanguage =
    bannerContext?.currentLanguage ?? 'th';

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="end"
        className="mb-2"
      >
        <Typography.Text className="mr-2">
          <IntlMessage id={tokens.common.language} /> :
        </Typography.Text>
        <Select
          style={{ width: 120 }}
          value={currentLanguage}
          onChange={
            bannerContext?.onChangeCurrentLanguage
          }
          options={[
            { label: 'ENGLISH', value: 'en' },
            { label: 'ภาษาไทย', value: 'th' },
          ]}
        />
      </Flex>
      <Form.Item
        label={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .acceptButton
            }
          />
        }
        name={['text', currentLanguage, 'accept']}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .settingCookieButton
            }
          />
        }
        name={['text', currentLanguage, 'settings']}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <Flex alignItems="center" className="mb-2">
            <Typography.Text className="mr-2">
              {
                <IntlMessage
                  id={
                    tokens.cookieManagement.cookieBanner
                      .rejectButton
                  }
                />
              }{' '}
              :
            </Typography.Text>
            <Form.Item
              name="enable_deny"
              valuePropName="checked"
              noStyle
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </Flex>
        }
        name={['text', currentLanguage, 'deny']}
      >
        <Input />
      </Form.Item>
    </>
  );
};
