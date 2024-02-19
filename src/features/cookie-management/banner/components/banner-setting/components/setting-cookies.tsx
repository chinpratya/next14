import {
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Divider, Form, Switch, Typography } from 'antd';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { UploadImage } from '@components/upload-image';
import { IntlMessage } from '@utilComponents/intl-message';

import { SettingCookiesPositionPicker } from './setting-cookies-position-picker';

export const SettingCookies = () => {
  return (
    <>
      <Form.Item>
        <Flex alignItems="center">
          <Typography.Text className="mr-2">
            <IntlMessage
              id={
                tokens.cookieManagement.cookieBanner
                  .settingCookie.label
              }
            />
          </Typography.Text>
          <Form.Item
            label="อยู่บนหน้าเว็บตลอดเวลา"
            name="on_display"
            valuePropName="checked"
            noStyle
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Typography.Text className="mb-3">
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .settingCookie.description
            }
          />
        </Typography.Text>
      </Form.Item>
      <Form.Item name="icon_logo">
        <UploadImage
          module="cookie-management"
          group="banner"
          accept="image/png, image/jpeg"
        />
      </Form.Item>
      <Divider />
      <Form.Item
        label={<IntlMessage id={tokens.common.style} />}
        name="icon_position"
      >
        <SettingCookiesPositionPicker />
      </Form.Item>
    </>
  );
};
