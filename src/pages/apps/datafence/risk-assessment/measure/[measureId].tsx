import { Button, Col, Form, Row, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetMeasure,
  MeasureInfo,
  useUpdateMeasureAndForm,
  MeasureForm,
} from '@/features/risk-assessment';
import { PermissionWrapper } from '@/features/shared';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const MeasureDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const measureId = router.query.measureId as string;

  const updateMeasure = useUpdateMeasureAndForm({
    measureId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskMeasures.notifications
            .update
        ) as string,
      });
    },
  });

  const { data, isLoading, isError } =
    useGetMeasure(measureId);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }

    return () => {
      form.resetFields();
    };
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="page" />;
  }

  const handleUpdateMeasureAndForm = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateMeasure.submit({
      data: {
        ...data,
        ...values,
      },
      form: queryClient.getQueryData([
        riskAssessmentQueryKeys.measured.form(measureId),
      ]) as Record<string, unknown>,
    });
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.riskMeasures
                .detailTitle
            }
          />
        }
        subtitle={data?.name}
        onBack={() => router.back()}
        extra={
          <PermissionWrapper
            moduleName={'assessment'}
            policies={[
              permissions[
                'pdpakit:assessment:assessmentrisk:update'
              ],
            ]}
          >
            <Button
              type="primary"
              loading={updateMeasure.isLoading}
              onClick={handleUpdateMeasureAndForm}
            >
              <IntlMessage id={tokens.common.save} />
            </Button>
          </PermissionWrapper>
        }
        overlap
      />
      <Tabs
        items={[
          {
            label: (
              <IntlMessage
                id={
                  tokens.riskAssessment.riskMeasures
                    .basicInfo
                }
              />
            ),
            key: 'basicInfo',
            children: (
              <Row>
                <Col {...getColLayout(12)}>
                  <MeasureInfo form={form} />
                </Col>
              </Row>
            ),
          },
          {
            label: (
              <IntlMessage
                id={
                  tokens.riskAssessment.riskMeasures
                    .customize
                }
              />
            ),
            key: 'customize',
            children: (
              <MeasureForm measureId={measureId} />
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

MeasureDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default MeasureDetailPage;
