import {
  Tabs,
  TabsProps,
  FormInstance,
  Form,
  Card,
  Button,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  PurposeDetailInfo,
  PurposeDetailHistory,
  useUpdatePurpose,
  useGetPurposeDetail,
  Purpose,
  PurposeBasicInfo,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { TitleHeader } from '@components/title-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const PurposeDetail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const purposeId = router.query.purposeId as string;

  const { data, isError, isLoading } =
    useGetPurposeDetail(purposeId);
  const getTabItems = (
    form: FormInstance
  ): TabsProps['items'] => {
    return [
      {
        key: 'info',
        label: (
          <IntlMessage id="dataMapping.purpose.detail.title" />
        ),
        children: (
          <PurposeDetailInfo
            form={form}
            data={(data as Purpose) ?? []}
          />
        ),
      },
      {
        key: 'history',
        label: (
          <IntlMessage id="dataMapping.purpose.detail.history" />
        ),
        children: (
          <PurposeDetailHistory purposeId={purposeId} />
        ),
      },
    ];
  };

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'dataMapping.notification.purpose.update'
      ) as string,
    });
  };

  const updatePurpose = useUpdatePurpose({
    purposeId,
    onSuccess,
  });

  const onSubmit = async (isPublish: boolean) => {
    await form.validateFields();
    const isConsent = form.getFieldValue('isConsent');

    const payload = {
      ...form.getFieldsValue(),
      consentDetail: isConsent
        ? form.getFieldValue('consentDetail')
        : '',
      isPublish,
    };
    updatePurpose.submit(payload);
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={() => router.back()}
        title={
          <TitleHeader
            title={
              <IntlMessage id="dataMapping.purpose.detail.title" />
            }
            meta={{
              purposeId: data?.name,
            }}
            tabKeys={[]}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:purpose:update'
              ],
            ]}
          >
            <Button
              onClick={() => router.back()}
              className="mr-1"
            >
              <IntlMessage id="dataMapping.purpose.detail.cancel" />
            </Button>
            <Button
              type="primary"
              loading={updatePurpose.isLoading}
              onClick={() => onSubmit(true)}
            >
              <IntlMessage id="dataMapping.purpose.detail.save" />
            </Button>
          </PermissionWrapper>
        }
      />
      <Card loading={isLoading}>
        <PurposeBasicInfo data={data as Purpose} />
      </Card>
      <Card loading={isLoading}>
        <Tabs items={getTabItems(form)} />
      </Card>
    </FallbackError>
  );
};

PurposeDetail.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default PurposeDetail;
