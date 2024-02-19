import { css } from '@emotion/css';
import {
  useLocalStorage,
  useToggle,
} from '@mantine/hooks';
import { Button, Card, Col, Divider, Row } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AppCookieLayout,
  BannerContextProvider,
  BannerPreview,
  BannerScriptModal,
  BannerSetting,
  BannerSettingType,
  useGetBanner,
  useUpdateDomain,
} from '@/features/cookie-management';
import { usePermission } from '@/hooks';
import { tokens } from '@/lang';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const CookieBannerPage = () => {
  const router = useRouter();

  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const [bannerSetting, setBannerSetting] =
    useState<Partial<BannerSettingType> | null>();
  const [openBannerScriptModal, toggleBannerScriptModal] =
    useToggle();

  const domainId = router.query.domainId as string;

  const updateDomain = useUpdateDomain({
    domainId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(tokens.common.notification.saved),
      });
    },
  });

  const { data, isLoading, isError } =
    useGetBanner(domainId);

  const editPermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:banner:update'],
    ],
  });

  const onChangeBannerSetting = (
    value: Partial<BannerSettingType>
  ) => {
    const changedBannerSetting =
      _.cloneDeep(bannerSetting);
    _.merge(changedBannerSetting, value);
    setBannerSetting(changedBannerSetting);
  };

  const onLanguageChange = (currentLanguage: string) => {
    setBannerSetting({
      ...bannerSetting,
      lang: currentLanguage,
    });
  };

  const [
    localStorageBannerPreview,
    setLocalStorageBannerPreview,
  ] = useLocalStorage({
    key: 'banner_preview',
    defaultValue: {},
  });

  useEffect(() => {
    if (data) {
      setBannerSetting(data);
    }
  }, [data, setBannerSetting]);

  useEffect(() => {
    setLocalStorageBannerPreview({
      ...(localStorageBannerPreview ?? {}),
      [domainId]: bannerSetting,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bannerSetting,
    domainId,
    setLocalStorageBannerPreview,
  ]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const onUpdateBannerSetting = () => {
    updateDomain.submit({
      setting: bannerSetting,
    });
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieBanner
                .pageTitle
            }
          />
        }
        extra={
          <>
            <Button
              onClick={() => toggleBannerScriptModal()}
            >
              <IntlMessage id={tokens.common.getScript} />
            </Button>
            <Button
              type="primary"
              onClick={onUpdateBannerSetting}
              loading={updateDomain.isLoading}
              disabled={!editPermission.isAllow}
            >
              <IntlMessage id={tokens.common.save} />
            </Button>
          </>
        }
      />
      <BannerContextProvider
        onLanguageChange={onLanguageChange}
      >
        <Card
          loading={isLoading}
          className={css`
            .ant-card-body {
              padding-left: 0;
              padding-bottom: 0;
            }
          `}
        >
          <Row>
            <Col
              {...getColLayout([24, 24, 24, 24, 12, 14])}
            >
              <BannerPreview
                pathname={router.pathname}
                domainId={domainId}
              />
            </Col>
            <Col
              {...getColLayout([0, 0, 0, 0, 1, 1])}
              className="text-center"
            >
              <Divider
                type="vertical"
                style={{ height: '100%' }}
              />
            </Col>
            <Col
              {...getColLayout([24, 24, 24, 24, 11, 9])}
            >
              <BannerSetting
                bannerSetting={bannerSetting}
                onChangeBannerSetting={
                  onChangeBannerSetting
                }
              />
            </Col>
          </Row>
        </Card>
        <BannerScriptModal
          domainId={domainId}
          open={openBannerScriptModal}
          onClose={toggleBannerScriptModal}
        />
      </BannerContextProvider>
    </FallbackError>
  );
};

CookieBannerPage.getLayout = (page: ReactNode) => (
  <AppCookieLayout
    permission={{
      moduleName: ['cookie'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:cookie:banner:read'],
      ],
    }}
  >
    {page}
  </AppCookieLayout>
);

export default CookieBannerPage;
