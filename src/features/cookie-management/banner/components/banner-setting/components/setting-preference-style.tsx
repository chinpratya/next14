import { Collapse } from 'antd';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { SettingColors } from './setting-colors';
import { SettingContent } from './setting-content';
import { SettingLayout } from './setting-layout';
import { SettingLogo } from './setting-logo';
import { SettingStyle } from './setting-style';

export const SettingPreferenceStyle = () => {
  return (
    <Collapse defaultActiveKey={['style']}>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.style} />}
        key="style"
      >
        <SettingStyle name="perf_style" />
      </Collapse.Panel>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.logo} />}
        key="logo"
      >
        <SettingLogo isPerfStyle />
      </Collapse.Panel>
      <Collapse.Panel
        header={
          <IntlMessage id={tokens.common.content} />
        }
        key="content"
      >
        <SettingContent isPerfStyle />
      </Collapse.Panel>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.color} />}
        key="color"
      >
        <SettingColors isPerfStyle />
      </Collapse.Panel>
      <Collapse.Panel
        header={<IntlMessage id={tokens.common.layout} />}
        key="layout"
      >
        <SettingLayout isPerfStyle />
      </Collapse.Panel>
    </Collapse>
  );
};
