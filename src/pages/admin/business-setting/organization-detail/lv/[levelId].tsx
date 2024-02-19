import { Button, Card, Col, Form, Row } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LvOrganizationDetail,
  OtherInformation,
  useGetOrganizationLv,
  useUpdateOrganizationLv,
} from '@/features/admin';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export const LevelOrganizationDetailPage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const router = useRouter();
  const levelId = router.query.levelId as string;
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetOrganizationLv(levelId);
  const parentData = useGetOrganizationLv(
    data?.underId as string
  );

  const updateOrganizationLv = useUpdateOrganizationLv({
    levelId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.organization.lv.update'
        ) as string,
      });
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      level: `Lv. ${data?.level ?? '-'}`,
      underName: '-',
    });
    if (parentData?.data) {
      const underLabel = `${_.get(
        parentData?.data,
        'label_th',
        '-'
      )}`;

      form.setFieldsValue({
        underName: `${underLabel} (Lv. ${_.get(
          parentData?.data,
          'level',
          '-'
        )})`,
      });
    }
    return () => {
      form.resetFields();
    };
  }, [form, data, parentData?.data]);

  if (isLoading || parentData?.isLoading)
    return <Loading cover="content" />;

  const onUpdateOrganizationLv = async () => {
    await form.validateFields();
    const payload = form.getFieldsValue([
      'label_th',
      'label_en',
    ]);
    updateOrganizationLv.submit(payload);
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.edit.title" />
        }
        extra={
          <>
            <Button onClick={() => router.back()}>
              <IntlMessage id="admin.businessSetting.organizationDetail.cancel" />
            </Button>
            <Button
              type="primary"
              loading={updateOrganizationLv.isLoading}
              onClick={onUpdateOrganizationLv}
            >
              <IntlMessage id="admin.businessSetting.organizationDetail.save" />
            </Button>
          </>
        }
        onBack={() => router.back()}
      />
      <OtherInformation
        createdBy={data?.created_by}
        createdDate={data?.created_dt}
        lastUpdatedBy={data?.updated_by}
        lastUpdatedDate={data?.updated_dt}
      />
      <Row>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.detail.title" />
            }
          >
            <LvOrganizationDetail form={form} />
          </Card>
        </Col>
      </Row>
    </FallbackError>
  );
};

LevelOrganizationDetailPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default LevelOrganizationDetailPage;
