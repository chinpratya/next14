import { Row, Col, Card, Form, Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  RoleInfo,
  useCreateRole,
} from '@/features/admin';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const CreateRolePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const createRole = useCreateRole({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.role.create'
        ) as string,
      });
      router.back();
    },
  });

  const onCreateRole = async () => {
    await form.validateFields();
    const values = await form.validateFields();
    createRole.submit(values);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.role.create.title" />
        }
        onBack={router.back}
        extra={
          <>
            <Button onClick={() => router.back()}>
              <IntlMessage id="admin.businessSetting.role.create.cancel" />
            </Button>
            <Button
              loading={createRole.isLoading}
              onClick={onCreateRole}
              type="primary"
            >
              <IntlMessage id="admin.businessSetting.role.create.save" />
            </Button>
          </>
        }
      />
      <Row>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="admin.businessSetting.role.basicInfo" />
            }
          >
            <RoleInfo form={form} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

CreateRolePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default CreateRolePage;
