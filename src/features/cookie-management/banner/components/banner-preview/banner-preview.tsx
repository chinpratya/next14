import { css } from '@emotion/css';
import { useElementSize } from '@mantine/hooks';
import { Divider, Image } from 'antd';
import { useContext } from 'react';

import { Flex } from '@components/flex';

import { BannerContext } from '../banner-context-provider';

import { PreviewDeviceSelect } from './components/preview-device-select';
import { PreviewDeviceWrapper } from './components/preview-device-wrapper';

export type BannerPreviewProps = {
  pathname?: string;
  domainId?: string;
  isSimilar?: boolean;
};

export const BannerPreview = ({
  pathname,
  domainId,
  isSimilar,
}: BannerPreviewProps) => {
  const bannerContext = useContext(BannerContext);

  const { ref, width, height } = useElementSize();

  const src = `${pathname}/previews/${bannerContext?.settingPreview}?domainId=${domainId}`;

  const deviceView = bannerContext?.deviceView;

  return (
    <>
      {!isSimilar && (
        <>
          <PreviewDeviceSelect
            device={deviceView}
            onChange={(device) =>
              bannerContext?.onChangeDeviceView(device)
            }
          />
          <Divider />
        </>
      )}
      <Flex justifyContent="center">
        <div
          ref={ref}
          className="pb-2"
          style={{
            display: 'block',
            width:
              deviceView === 'tablet'
                ? 625
                : deviceView === 'mobile'
                ? 325
                : '100%',
            maxWidth:
              deviceView === 'tablet'
                ? 360
                : deviceView === 'mobile'
                ? 255
                : 1200,
          }}
        >
          <PreviewDeviceWrapper elementWidth={width}>
            <div className={`device ${deviceView}`}>
              <div
                className={css`
                  margin-left: auto;
                  margin-right: auto;
                  background-color: #ccd6e0;
                  width: 100%;
                `}
              >
                <Image
                  src={`/img/cookie-management/devices-toolbar/${deviceView}-toolbar.png`}
                  preview={false}
                  alt="header-device-preview"
                  width="100%"
                  style={{
                    marginTop: -5,
                  }}
                />
              </div>
              <iframe
                id="preview-banner"
                title="preview-banner"
                width="100%"
                height="100%"
                src={src}
              />
            </div>
          </PreviewDeviceWrapper>
        </div>
      </Flex>
    </>
  );
};
