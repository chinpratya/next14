import { Button, Form } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  getOrganizationManagement,
  // getUserDetail,
} from '@/features/admin';
import {
  DataControllerForm,
  useCreateDataController,
} from '@/features/data-mapping';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const DataControllerCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const createDataController = useCreateDataController({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataController.create.success'
        ) as string,
      });
      router.back();
    },
  });

  const handlerCreateDataController = async () => {
    try {
      await form.validateFields();
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

      createDataController.submit(values);
    } catch (error) {
      showNotification({
        type: 'error',
        message: t(
          'dataMapping.notification.dataController.create.error'
        ) as string,
      });
    }
  };

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="dataMapping.dataController.create.title" />
        }
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="dataMapping.dataController.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={handlerCreateDataController}
              loading={createDataController.isLoading}
            >
              <IntlMessage id="dataMapping.dataController.save" />
            </Button>
          </>
        }
      />
      <DataControllerForm form={form} isCreate={true} />
    </>
  );
};

DataControllerCreatePage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default DataControllerCreatePage;
