import { css } from '@emotion/css';
import { Divider, Form, Radio } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { BannerSettingType } from '../../types';
import { BannerContext } from '../banner-context-provider';

import { SettingBannerStyle } from './components/setting-banner-style';
import { SettingPreferenceStyle } from './components/setting-preference-style';

type BannerSettingProps = {
  bannerSetting?: Partial<BannerSettingType> | null;
  onChangeBannerSetting?: (
    value: Partial<BannerSettingType>
  ) => void;
};

export const BannerSetting = ({
  bannerSetting,
  onChangeBannerSetting,
}: BannerSettingProps) => {
  const [form] = Form.useForm();
  const bannerContext = useContext(BannerContext);

  const [selectedSetting, setSelectedSetting] = useState<
    'banner-setting' | 'preference-setting'
  >('banner-setting');

  const onChange = (
    changedValue: Partial<BannerSettingType>
  ) => {
    onChangeBannerSetting?.(changedValue);
  };

  useEffect(() => {
    if (bannerSetting) {
      form.setFieldsValue(bannerSetting);
    }
  }, [bannerSetting, form]);

  return (
    <>
      <Flex justifyContent="center">
        <Radio.Group
          value={selectedSetting}
          onChange={(event) => {
            bannerContext?.onChangeSettingPreview(
              event.target.value === 'banner-setting'
                ? 'banner'
                : 'preference'
            );
            setSelectedSetting(event.target.value);
          }}
          options={[
            {
              label: (
                <IntlMessage
                  id={
                    tokens.cookieManagement.cookieBanner
                      .customizeBanner
                  }
                />
              ),
              value: 'banner-setting',
            },
            {
              label: (
                <IntlMessage
                  id={
                    tokens.cookieManagement.cookieBanner
                      .customizePreferences
                  }
                />
              ),
              value: 'preference-setting',
            },
          ]}
          optionType="button"
          buttonStyle="solid"
        />
      </Flex>
      <Divider />

      <div>
        <Scrollbars
          style={{
            height:
              'calc(100vh - 70px - 90px - 48px - 48px - 50px - 40px - 60px - 13px)',
          }}
        >
          <Form
            form={form}
            layout="vertical"
            className={css`
              .ant-form-item {
                margin-bottom: 22px;
              }
            `}
            onValuesChange={onChange}
          >
            {selectedSetting === 'banner-setting' ? (
              <SettingBannerStyle />
            ) : (
              <SettingPreferenceStyle />
            )}
          </Form>
        </Scrollbars>
      </div>
    </>
  );
};
