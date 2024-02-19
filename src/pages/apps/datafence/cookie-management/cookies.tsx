import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AppCookieLayout,
  CookieItem,
  CookiesByCategoryList,
  CookiesEdit,
  useGetCookiesAndCategory,
  useUpdateScanCookie,
} from '@/features/cookie-management';
import { tokens } from '@/lang';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const CookiesPage = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [cookies, setCookies] = useState<
    CookieItem[] | null
  >(null);

  const { showNotification } = useNotifications();

  const domainId = router.query.domainId as string;

  const { isLoading, isError, data } =
    useGetCookiesAndCategory(domainId);

  const updateCookieScan = useUpdateScanCookie({
    domainId,
    onSuccess: () => {
      setCookies(null);
      showNotification({
        type: 'success',
        message: t(
          tokens.cookieManagement.notification
            .updateCookieSuccess
        ),
      });
    },
  });

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const handlerEditCookies = (cookies: CookieItem[]) => {
    setCookies(cookies);
  };

  const handlerUpdateCookies = (
    cookies: CookieItem[]
  ) => {
    setCookies(cookies);
  };

  const onSave = () => {
    updateCookieScan.submit({
      cookies: cookies ?? [],
    });
  };

  const onCancel = () => {
    setCookies(null);
  };

  if (cookies) {
    return (
      <FallbackError isError={isError}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PageHeader
            title={
              <IntlMessage
                id={tokens.cookieManagement.cookies.title}
              />
            }
            onBack={onCancel}
            extra={
              <>
                <Button onClick={onCancel}>
                  <IntlMessage
                    id={tokens.common.cancel}
                  />
                </Button>
                <Button
                  type="primary"
                  onClick={onSave}
                  loading={updateCookieScan.isLoading}
                >
                  <IntlMessage id={tokens.common.save} />
                </Button>
              </>
            }
          />
          <CookiesEdit
            cookies={cookies}
            categories={data?.category ?? []}
            setCookies={handlerUpdateCookies}
          />
        </motion.div>
      </FallbackError>
    );
  }

  return (
    <FallbackError isError={isError}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PageHeader
          title={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies.pageTitle
              }
            />
          }
        />
        <CookiesByCategoryList
          domainId={domainId}
          cookies={data?.cookies ?? []}
          categories={data?.category ?? []}
          onEdit={handlerEditCookies}
        />
      </motion.div>
    </FallbackError>
  );
};

CookiesPage.getLayout = (page: ReactNode) => (
  <AppCookieLayout
    permission={{
      moduleName: ['cookie'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:cookie:cookie:read'],
      ],
    }}
  >
    {page}
  </AppCookieLayout>
);

export default CookiesPage;
