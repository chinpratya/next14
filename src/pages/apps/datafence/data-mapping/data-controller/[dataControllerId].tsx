import { useToggle } from '@mantine/hooks';
import { Button, Form } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  getOrganizationManagement,
  // getUserDetail,
} from '@/features/admin';
import {
  DataControllerForm,
  useGetDataController,
  useUpdateDataController,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const DataControllerDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const [isUpdateLoading, toggleUpdateLoading] =
    useToggle();
  const { showNotification } = useNotifications();

  const dataControllerId = router.query
    .dataControllerId as string;

  const updateController = useUpdateDataController({
    dataControllerId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataController.update'
        ) as string,
      });
    },
  });

  const { data, isLoading, isError } =
    useGetDataController(dataControllerId);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        userName: data.name,
      });
    }
  }, [data, form]);

  if (isLoading) return <Loading cover="content" />;

  const handlerUpdateDataController = async () => {
    try {
      await form.validateFields();
      toggleUpdateLoading(true);
      const values = form.getFieldsValue();
      if (values.organizationID) {
        const organization =
          await getOrganizationManagement(
            values.organizationID
          );
        values.organizationName =
          organization.department_name;
        values.name = organization.department_name;
      }
      if (values.userName) {
        // const { data: user } = await getUserDetail(
        //   values.userID
        // );
        values.name = values.userName;
      }
      if (!values.name) {
        values.name = values.organizationName;
      }
      toggleUpdateLoading(false);
      updateController.submit(values);
    } catch (error) {
      toggleUpdateLoading(false);
    }
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataController.detail.title" />
        }
        subtitle={data?.name}
        onBack={router.back}
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:dataprocessor:update'
              ],
            ]}
          >
            <Button
              onClick={router.back}
              className="mr-2"
            >
              <IntlMessage id="dataMapping.dataController.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={handlerUpdateDataController}
              loading={
                isUpdateLoading ||
                updateController.isLoading
              }
            >
              <IntlMessage id="dataMapping.dataController.save" />
            </Button>
          </PermissionWrapper>
        }
      />
      <DataControllerForm form={form} />
    </FallbackError>
  );
};

DataControllerDetailPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default DataControllerDetailPage;
