import { Form, Switch, Typography } from 'antd';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { UploadImage } from '@components/upload-image';
import { IntlMessage } from '@utilComponents/intl-message';

export type SettingLogoProps = {
  isPerfStyle?: boolean;
};

export const SettingLogo = ({
  isPerfStyle,
}: SettingLogoProps) => {
  const showBandLogoName = !isPerfStyle
    ? 'show_brand_logo'
    : 'perf_show_brand_logo';

  const bannerLogoUrlName = !isPerfStyle
    ? 'brand_logo_url'
    : 'perf_brand_logo_url';

  return (
    <>
      <Flex alignItems="center" className="mb-4">
        <Typography.Text className="mr-2">
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .festivalToggleLabel
            }
          />{' '}
          :
        </Typography.Text>
        <Form.Item
          name={showBandLogoName}
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
      <Form.Item name={bannerLogoUrlName}>
        <UploadImage
          module="cookie-management"
          group="banner"
          accept="image/png, image/jpeg"
        />
      </Form.Item>
    </>
  );
};
