import { Button, Card, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { PermissionWrapper } from '@/features/shared';
import {
  RuleInfo,
  RuleInformation,
  useGetRuleInfo,
  useUpdateRule,
} from '@/features/siem';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const DetailDetectionRulePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const [filters, setFilters] =
    useState<Record<string, unknown>>();

  const ruleId = router.query.indexId as string;

  const { data, isLoading, isError } =
    useGetRuleInfo(ruleId);

  const onChangeFilter = (
    filters: Record<string, unknown>
  ) => {
    setFilters(filters);
  };

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.updated'
      ) as string,
    });
  };

  const updateRule = useUpdateRule({
    ruleId,
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const payload = {
      ...values,
      components: [
        {
          ...data?.components[0],
          ...values.components[0],
          filters: { bool: filters },
        },
      ],
    };

    updateRule.submit(payload);
  };

  useEffect(() => {
    if (data) {
      setFilters(data.components[0].filters?.bool);
    }
  }, [data]);

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="siem.detectionRule.detectionRule" />
        }
        subtitle={data?.name as string}
        extra={
          <PermissionWrapper
            moduleName="siem"
            policies={[
              permissions['cyber:siem:rule:update'],
            ]}
          >
            <Button
              type="primary"
              onClick={onSubmit}
              disabled={data?.type === 'STANDARD'}
              loading={updateRule.isLoading}
            >
              <IntlMessage id="logManagement.update" />
            </Button>
          </PermissionWrapper>
        }
      />
      <Card>
        <RuleInformation
          data={data as RuleInfo}
          form={form}
          filters={filters}
          onSubmit={onSubmit}
          onChangeFilter={onChangeFilter}
        />
      </Card>
    </FallbackError>
  );
};

DetailDetectionRulePage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [permissions['cyber:siem:rule:read']],
      }}
    >
      {page}
    </AppLayout>
  );
};

export default DetailDetectionRulePage;
