import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Radio } from 'antd';
import { useContext } from 'react';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  BannerContext,
  BannerContextProviderState,
} from '../banner-context-provider';
import { BannerPreview } from '../banner-preview';

const DEVICES_CONSTANT = [
  {
    label: <DesktopOutlined />,
    value: 'desktop',
  },
  {
    label: <TabletOutlined />,
    value: 'tablet',
  },
  {
    label: <MobileOutlined />,
    value: 'mobile',
  },
];

export type BannerWizardPreviewProps = {
  domainId?: string;
};

export const BannerWizardPreview = ({
  domainId,
}: BannerWizardPreviewProps) => {
  const bannerContext = useContext(BannerContext);

  const onChangeSettingPreview = (
    settingPreview: BannerContextProviderState['settingPreview']
  ) =>
    bannerContext?.onChangeSettingPreview(settingPreview);

  const onChangeDeviceView = (
    deviceView: BannerContextProviderState['deviceView']
  ) => bannerContext?.onChangeDeviceView(deviceView);

  return (
    <>
      <Flex justifyContent="center" className="mb-4">
        <Radio.Group
          value={bannerContext?.settingPreview}
          defaultValue="banner"
          onChange={(event) =>
            onChangeSettingPreview(
              event.target
                .value as BannerContextProviderState['settingPreview']
            )
          }
          options={[
            {
              label: (
                <IntlMessage
                  id={
                    tokens.cookieManagement.modalWizard
                      .customizeBanner
                  }
                />
              ),
              value: 'banner',
            },
            {
              label: (
                <IntlMessage
                  id={
                    tokens.cookieManagement.modalWizard
                      .customizePreferences
                  }
                />
              ),
              value: 'preference',
            },
          ]}
          optionType="button"
          buttonStyle="solid"
        />
      </Flex>
      <div
        className={css`
          position: absolute;
          top: 50%;

          .device-select {
            .ant-btn {
              :first-child {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-bottom: 0;
              }

              :not(:first-child):not(:last-child) {
                border-radius: 0;
              }

              :last-child {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                border-top: 0;
              }
            }
          }
        `}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          className="device-select"
        >
          {DEVICES_CONSTANT.map((device) => (
            <Button
              key={device.value}
              type={
                bannerContext?.deviceView === device.value
                  ? 'primary'
                  : 'default'
              }
              onClick={() =>
                onChangeDeviceView(
                  device.value as BannerContextProviderState['deviceView']
                )
              }
            >
              {device.label}
            </Button>
          ))}
        </Flex>
      </div>
      <BannerPreview
        pathname="/apps/datafence/cookie-management/cookie-banner"
        domainId={domainId}
        isSimilar
      />
    </>
  );
};
