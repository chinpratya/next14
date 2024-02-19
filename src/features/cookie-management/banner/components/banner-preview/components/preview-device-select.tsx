import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { Radio } from 'antd';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { DeviceView } from '../../banner-context-provider';

export type PreviewDeviceSelectProps = {
  device?: DeviceView;
  onChange?: (device: DeviceView) => void;
};

export const PreviewDeviceSelect = ({
  device,
  onChange,
}: PreviewDeviceSelectProps) => {
  return (
    <Flex justifyContent="center">
      <Radio.Group
        value={device}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        optionType="button"
        buttonStyle="solid"
        options={[
          {
            label: (
              <>
                <DesktopOutlined className="mr-1" />
                <IntlMessage id={tokens.common.desktop} />
              </>
            ),
            value: 'desktop',
          },
          {
            label: (
              <>
                <TabletOutlined className="mr-1" />
                <IntlMessage id={tokens.common.tablet} />
              </>
            ),
            value: 'tablet',
          },
          {
            label: (
              <>
                <MobileOutlined className="mr-1" />
                <IntlMessage id={tokens.common.mobile} />
              </>
            ),
            value: 'mobile',
          },
        ]}
      />
    </Flex>
  );
};
