import { Button, Col, Form, Row } from 'antd';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  BasicInfoForm,
  useCreateInitPassword,
  useGetDataInitPassword,
} from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const SetPasswordPage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetDataInitPassword();

  const initPassword = useCreateInitPassword({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.password.set'
        ) as string,
      });
    },
  });

  const onCreate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (values.internal.temporary === false) {
      values.internal = {
        temporary: true,
        password_type: 'system',
      };
    } else {
      values.internal = {
        temporary: false,
        password_type: values.internal.password_type,
        password: values.internal.password,
      };
    }

    if (values.external.temporary === false) {
      values.external = {
        temporary: true,
        password_type: 'system',
      };
    } else {
      values.external = {
        temporary: false,
        password_type: values.external.password_type,
        password: values.external.password,
      };
    }

    initPassword.submit({
      ...values,
    });
  };

  useEffect(() => {
    if (data) {
      if (data.internal.temporary === true) {
        data.internal = {
          temporary: false,
          password_type: 'system',
        };
      } else {
        data.internal = {
          temporary: true,
          password_type: data.internal.password_type,
          password: data.internal.password,
        };
      }

      if (data.external.temporary === true) {
        data.external = {
          temporary: false,
          password_type: 'system',
        };
      } else {
        data.external = {
          temporary: true,
          password_type: data.external.password_type,
          password: data.external.password,
        };
      }

      form?.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <FallbackError isError={isError}>
      <Form.Provider>
        <PageHeader
          title={
            <IntlMessage id="admin.businessSetting.setPassword" />
          }
          extra={
            <Button
              type="primary"
              onClick={onCreate}
              loading={initPassword.isLoading}
            >
              <IntlMessage id="admin.businessSetting.setPassword.save" />
            </Button>
          }
        />
        <Row gutter={[24, 0]}>
          <Col {...getColLayout(12)}>
            <BasicInfoForm
              form={form}
              name={'internal'}
              loading={isLoading}
            />
          </Col>
          <Col {...getColLayout(12)}>
            <BasicInfoForm
              form={form}
              name={'external'}
              loading={isLoading}
            />
          </Col>
        </Row>
      </Form.Provider>
    </FallbackError>
  );
};

SetPasswordPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default SetPasswordPage;
