import { Button, Card, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DataCategoriesForm,
  useCreateDataCategories,
} from '@/features/data-mapping';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const DataCategoriesCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const createDataCategories = useCreateDataCategories({
    onSuccess: (categoryID: string) => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataCategories.create'
        ) as string,
      });
      router.replace(
        `/apps/datafence/data-mapping/data-categories/${categoryID}`
      );
    },
  });

  const onCreateDataCategories = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      name: values.name,
      categoryClassificationID: [],
      organizationID: values.organizationID,
      groupID: values.groupID,
      dataSubjectID: values.dataSubjectID,
      tagID: values.tagID,
      numberPerson: values.numberPerson,
    };
    createDataCategories.submit(payload);
  };

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="dataMapping.dataCategories.create.title" />
        }
        extra={
          <>
            <Button onClick={router.back}>
              {
                <IntlMessage id="dataMapping.dataCategories.create.cancel" />
              }
            </Button>
            <Button
              type="primary"
              loading={createDataCategories.isLoading}
              onClick={() => onCreateDataCategories()}
            >
              {
                <IntlMessage id="dataMapping.dataCategories.create.save" />
              }
            </Button>
          </>
        }
      />
      <Card
        title={
          <IntlMessage id="dataMapping.dataCategories.detail" />
        }
      >
        <DataCategoriesForm form={form} />
      </Card>
    </>
  );
};

DataCategoriesCreatePage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default DataCategoriesCreatePage;
