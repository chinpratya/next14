import { Button, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { Loading } from '@/components/share-components/loading';
import { PageHeader } from '@/components/share-components/page-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  IndicesLogForwardingInfo,
  useGetLogForwarding,
  useUpdateLogForwarding,
} from '@/features/log-management';
import { PermissionWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { useNotifications } from '@/stores/notifications';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const LogForwardingDetail = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { forwardingId, indiceId } = router.query;

  const { data, isError, isLoading } =
    useGetLogForwarding({
      forwardingId: forwardingId as string,
    });

  const updateLogForwarding = useUpdateLogForwarding({
    forwardingId: forwardingId as string,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
    },
  });

  const isEditor = router.query?.edit === 'true';

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const filter = values.filter;
    const severity = values.filter.severity ?? [];
    const facility = values.filter.facility ?? [];

    updateLogForwarding.submit({
      indices: indiceId,
      ...values,
      filter: {
        ...filter,
        severity: severity.includes(-1) ? [] : severity,
        facility: facility.includes(-1) ? [] : facility,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const filter = data.filter;

      form.setFieldsValue({
        ...data,
        filter: {
          ...filter,
          host: !!filter.host ? filter.host : undefined,
          severity:
            filter.severity.length < 1
              ? [-1]
              : filter.severity,
          facility:
            filter.facility.length < 1
              ? [-1]
              : filter.facility,
        },
      });
    }
  }, [data, form]);

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title="Log Forwarding"
        subtitle={data?.name}
        extra={
          <PermissionWrapper
            moduleName={lm}
            policies={[
              permissions['cyber:lm:indices:update'],
            ]}
          >
            {isEditor ? (
              <Button
                type="primary"
                onClick={onSubmit}
                loading={updateLogForwarding.isLoading}
              >
                <IntlMessage id="logManagement.update" />
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  router.query.edit = 'true';
                  router.push(router);
                }}
              >
                <IntlMessage id="logManagement.edit" />
              </Button>
            )}
          </PermissionWrapper>
        }
      />

      <IndicesLogForwardingInfo
        form={form}
        isEditor={isEditor}
      />
    </FallbackError>
  );
};

LogForwardingDetail.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:indices:read']],
      }}
    >
      {page}
    </AppLayout>
  );
};

export default LogForwardingDetail;
