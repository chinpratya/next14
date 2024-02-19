import { Button, Card, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { PermissionWrapper } from '@/features/shared';
import {
  RuleCreate,
  useCreateRule,
} from '@/features/siem';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const CreateDetectionRulePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const [filters, setFilters] =
    useState<Record<string, unknown>>();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.created'
      ) as string,
    });
    router.back();
  };

  const createRule = useCreateRule({ onSuccess });

  const onChangeFilter = (
    filters: Record<string, unknown>
  ) => {
    setFilters(filters);
  };

  const onSaveDetectionRule = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      ...values,
      components: [
        {
          ...values.components[0],
          filters: { bool: filters },
        },
      ],
    };
    createRule.submit(payload);
  };

  return (
    <>
      <PageHeader
        onBack={router.back}
        title="Detection Rule"
        subtitle="Create & Customize Rules"
        extra={
          <PermissionWrapper
            moduleName="siem"
            policies={[
              permissions['cyber:siem:rule:create'],
            ]}
          >
            <Button
              type="primary"
              loading={createRule.isLoading}
              onClick={onSaveDetectionRule}
            >
              <IntlMessage id="logManagement.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <Card>
        <RuleCreate
          form={form}
          onChangeFilter={onChangeFilter}
          filters={filters}
        />
      </Card>
    </>
  );
};

CreateDetectionRulePage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [permissions['cyber:siem:rule:create']],
      }}
    >
      {page}
    </AppLayout>
  );
};

export default CreateDetectionRulePage;
