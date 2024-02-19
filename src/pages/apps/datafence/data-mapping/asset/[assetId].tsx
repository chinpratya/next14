import { Button, Card, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  AssetDetail,
  AssetForm,
  AssetResponsibleList,
  useGetAsset,
  useUpdateAsset,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const AssetDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const assetId = router.query.assetId as string;

  const { data, isLoading, isError } =
    useGetAsset(assetId);

  const updateAsset = useUpdateAsset({
    assetId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.asset.update'
        ) as string,
      });
    },
  });

  const onUpdateAsset = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateAsset.submit({ ...values, assetID: assetId });
  };

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={() => router.back()}
        title={
          <IntlMessage id="dataMapping.asset.detail" />
        }
        subtitle={data?.name}
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions['pdpakit:datamap:asset:update'],
            ]}
          >
            <Button onClick={() => router.back()}>
              <IntlMessage id="dataMapping.asset.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onUpdateAsset}
              loading={updateAsset.isLoading}
            >
              <IntlMessage id="dataMapping.asset.save" />
            </Button>
          </PermissionWrapper>
        }
      />

      <Card title={<IntlMessage id="basicInfo" />}>
        <AssetDetail asset={data} />
      </Card>
      <Card
        title={
          <IntlMessage id="dataMapping.asset.detail" />
        }
      >
        <AssetForm form={form} />
      </Card>
      <AssetResponsibleList assetId={assetId} />
    </FallbackError>
  );
};

AssetDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AssetDetailPage;
