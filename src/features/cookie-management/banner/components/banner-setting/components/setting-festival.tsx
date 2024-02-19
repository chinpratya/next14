import { Form, Switch, Typography } from 'antd';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

export const SettingFestival = () => (
  <>
    <Flex alignItems="center">
      <Typography.Text className="mr-2">
        <IntlMessage
          id={
            tokens.cookieManagement.cookieBanner
              .festivalLabel
          }
        />{' '}
        :{' '}
      </Typography.Text>
      <Form.Item
        name="according_festival"
        valuePropName="checked"
        noStyle
      >
        <Switch
          checkedChildren={
            <IntlMessage id={tokens.common.on} />
          }
          unCheckedChildren={
            <IntlMessage id={tokens.common.off} />
          }
        />
      </Form.Item>
    </Flex>
    <Typography.Paragraph
      style={{
        color: '#72849A',
        marginBottom: 0,
        marginTop: 22,
      }}
    >
      <IntlMessage
        id={
          tokens.cookieManagement.cookieBanner
            .festivalDescription
        }
      />
    </Typography.Paragraph>
  </>
);
