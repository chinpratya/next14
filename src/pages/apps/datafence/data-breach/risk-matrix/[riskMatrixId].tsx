import { Button, Card, Col, Form, Row, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  RiskMatrixChance,
  RiskMatrixEffect,
  RiskMatrixInfo,
  RiskMatrixScore,
  useGetRiskMatrix,
  useUpdateRiskMatrix,
} from '@/features/data-breach';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';
import { PermissionWrapper } from '@/features/shared';
import { permissions } from '@/permissions';
import { usePermission } from '@/hooks';

export const RiskMatrixDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const riskMatrixId = router.query
    .riskMatrixId as string;

  const { data, isLoading, isError } =
    useGetRiskMatrix(riskMatrixId);

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:update'],
    ],
  });

  const updateRiskMatrix = useUpdateRiskMatrix({
    riskMatrixId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.riskMatrix.notifications
            .update
        ) as string,
      });
    },
  });

  const onUpdate = async () => {
    try {
      await form.validateFields();
      updateRiskMatrix.submit(form.getFieldsValue());
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);
    return () => {
      form.resetFields();
    };
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const tabItems = [
    {
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.basicInfo}
        />
      ),
      key: 'info',
      children: (
        <Row>
          <Col {...getColLayout(12)}>
            <RiskMatrixInfo form={form} />
          </Col>
        </Row>
      ),
    },
    {
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.builder}
        />
      ),
      key: 'builder',
      children: (
        <Card
          title={
            <IntlMessage
              id={tokens.dataBreach.riskMatrix.setting}
            />
          }
        >
          <RiskMatrixChance riskMatrixId={riskMatrixId} />
          <RiskMatrixEffect riskMatrixId={riskMatrixId} />
          <RiskMatrixScore
            riskMatrixId={riskMatrixId}
            isAllow={editPermission.isAllow}
          />
        </Card>
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage
            id={tokens.dataBreach.riskMatrix.detail}
          />
        }
        subtitle={data?.name}
        overlap
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:riskmatrix:update'
              ],
            ]}
          >
            <Button
              type="primary"
              loading={updateRiskMatrix.isLoading}
              onClick={onUpdate}
            >
              <IntlMessage id={tokens.common.save} />
            </Button>
          </PermissionWrapper>
        }
      />

      <Tabs items={tabItems} />
    </FallbackError>
  );
};

RiskMatrixDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default RiskMatrixDetailPage;
