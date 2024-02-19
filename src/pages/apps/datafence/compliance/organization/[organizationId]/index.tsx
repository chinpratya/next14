import { Button, Form } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  OrganizationBasicInfo,
  useGetOrganization,
  useUpdateOrganization,
} from '@/features/compliance';
import { PermissionWrapper } from '@/features/shared';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const OrganizationDetailPage = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const router = useRouter();
  const [form] = Form.useForm();

  const organizationId = router.query
    .organizationId as string;

  const { data, isLoading, isError } =
    useGetOrganization(organizationId);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'compliance.notification.organization.update'
      ) as string,
    });
  };

  const updateOrganization = useUpdateOrganization({
    organizationId,
    onSuccess,
  });

  const onUpdateOrganization = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateOrganization.submit({
      organizationId,
      data: {
        name: values.name,
        description: values.description,
        industryGroup:
          _.get(
            values,
            'industryGroupAndBusinessCategory[0]'
          ) ?? '',
        businessCategory:
          _.get(
            values,
            'industryGroupAndBusinessCategory[1]'
          ) ?? '',
        orgGroup: values.orgGroup,
      },
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        industryGroupAndBusinessCategory: [
          data.industryGroupID,
          data.businessCategoryID,
        ],
        orgGroup: data?.orgGroupID,
      });
    }
    return () => {
      form.resetFields();
    };
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="compliance.organization.detail.title" />
        }
        subtitle={data?.name}
        extra={
          <PermissionWrapper
            moduleName={'compliance'}
            policies={[
              permissions[
                'pdpakit:compliance:organization:update'
              ],
            ]}
          >
            <Button
              type="primary"
              loading={updateOrganization.isLoading}
              onClick={onUpdateOrganization}
            >
              <IntlMessage id="compliance.organization.save" />
            </Button>
          </PermissionWrapper>
        }
      />
      <OrganizationBasicInfo
        form={form}
        data={data}
        loading={isLoading}
      />
    </FallbackError>
  );
};

OrganizationDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default OrganizationDetailPage;
