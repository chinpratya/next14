import { Button, Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Preference,
  PurposeGeneralForm,
  PurposeSetting,
  useGetConsentManagementPurpose,
  useUpdateConsentManagementPurpose,
} from '@/features/consent-management';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const PurposeDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const purposeId = router.query.purposeId as string;

  const { showNotification } = useNotifications();

  const [tabsKey, setTabsKey] = useState('basicInfo');
  const [preferences, setPreferences] = useState<
    Preference[]
  >([]);

  const [detailPurpose, setDetailPurpose] =
    useState<Record<string, unknown>>();

  const { data, isLoading, isError } =
    useGetConsentManagementPurpose({
      purposeId,
    });

  const [form] = Form.useForm();

  const updatePurpose = useUpdateConsentManagementPurpose(
    {
      purposeId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'consentManagement.notification.purpose.update'
          ) as string,
        });
      },
    }
  );

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
      setPreferences(data.preferences);
    }
  }, [form, data]);

  const onSubmit = () => {
    const payload = {
      ...data,
      ...form.getFieldsValue(),
      preferences: preferences,
    };
    delete payload.purposeID;
    updatePurpose.submit(payload);
  };
  const onChangTabs = (key: string) => {
    setTabsKey(key);
    setDetailPurpose({
      ...detailPurpose,
      ...form.getFieldsValue(),
    });
  };
  const onChangePreference = (
    preferences: Preference[]
  ) => setPreferences(preferences);

  if (isLoading || !purposeId) {
    return <Loading cover={'content'} />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.purpose.detail.title" />
        }
        subtitle={data?.name}
        onBack={() => router.back()}
        extra={
          <PermissionWrapper
            moduleName={'consent'}
            policies={[
              permissions[
                'pdpakit:consent:purpose:update'
              ],
            ]}
          >
            <Button
              onClick={() => router.back()}
              className="mr-1"
            >
              <IntlMessage id="consentManagement.purpose.cancel" />
            </Button>

            <Button
              type="primary"
              onClick={() => onSubmit()}
              loading={updatePurpose.isLoading}
            >
              <IntlMessage id="consentManagement.purpose.save" />
            </Button>
          </PermissionWrapper>
        }
        overlap
      />
      <Tabs
        destroyInactiveTabPane
        activeKey={tabsKey}
        onChange={onChangTabs}
        items={[
          {
            key: 'basicInfo',
            label: (
              <IntlMessage id="consentManagement.purpose.basicInfo" />
            ),
            children: (
              <PurposeGeneralForm
                form={form}
                purposeId={purposeId}
                data={data}
              />
            ),
          },
          {
            key: 'custom',
            label: (
              <IntlMessage id="consentManagement.purpose.customPurpose" />
            ),
            children: (
              <PurposeSetting
                form={form}
                preferences={preferences}
                onChangePreference={onChangePreference}
                loading={isLoading}
                dataPurpose={data}
              />
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

PurposeDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default PurposeDetailPage;
