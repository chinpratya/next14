import { Button, Form } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  OrganizationBasicInfo,
  useGetOrganization,
  useUpdateOrganization,
} from '@/features/compliance';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const OrganizationDetailPage = () => {
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
      message: 'บันทึกข้อมูลสำเร็จ',
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
        title="รายละเอียดองค์กร"
        subtitle={data?.name}
        extra={
          <Button
            type="primary"
            loading={updateOrganization.isLoading}
            onClick={onUpdateOrganization}
          >
            บันทึก
          </Button>
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
