import { Collapse } from 'antd';
import { useContext, useState } from 'react';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { BannerContext } from '../../banner-context-provider';

import { SettingButton } from './setting-button';
import { SettingColors } from './setting-colors';
import { SettingContent } from './setting-content';
import { SettingCookies } from './setting-cookies';
import { SettingLayout } from './setting-layout';
import { SettingLogo } from './setting-logo';
import { SettingStyle } from './setting-style';

const ICON_SETTING_KEY = ['cookie-setting'];

export const SettingBannerStyle = () => {
  const bannerContext = useContext(BannerContext);

  const [activeKey, setActiveKey] = useState<string[]>([
    'style',
  ]);

  const onCollapseChange = (key: string[] | string) => {
    if (typeof key === 'string') {
      setActiveKey([key]);
      return;
    }
    const isToggleIconSetting = ICON_SETTING_KEY.includes(
      key[key.length - 1]
    );
    if (isToggleIconSetting) {
      key = key.filter((item) =>
        ICON_SETTING_KEY.includes(item)
      );
      bannerContext?.onChangeSettingPreview('icon');
    } else {
      key = key.filter(
        (item) => !ICON_SETTING_KEY.includes(item)
      );
      bannerContext?.onChangeSettingPreview('banner');
    }
    setActiveKey(key);
  };

  return (
    <Collapse
      activeKey={activeKey}
      onChange={onCollapseChange}
    >
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.style} />}
        key="style"
      >
        <SettingStyle name="style" />
      </Collapse.Panel>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.logo} />}
        key="logo"
      >
        <SettingLogo />
      </Collapse.Panel>
      <Collapse.Panel
        header={
          <IntlMessage id={tokens.common.content} />
        }
        key="content"
      >
        <SettingContent />
      </Collapse.Panel>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.color} />}
        key="color"
      >
        <SettingColors />
      </Collapse.Panel>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.layout} />}
        key="layout"
      >
        <SettingLayout />
      </Collapse.Panel>
      <Collapse.Panel
        header={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .settingCookie.title
            }
          />
        }
        key="cookie-setting"
      >
        <SettingCookies />
      </Collapse.Panel>
      <Collapse.Panel
        header={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .settingButton
            }
          />
        }
        key="edit-button"
      >
        <SettingButton />
      </Collapse.Panel>
    </Collapse>
  );
};
