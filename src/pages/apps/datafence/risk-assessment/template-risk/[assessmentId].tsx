import { Button, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TemplateRiskDetal,
  TemplateRiskDescriptions,
  useGetTemplateRisk,
  useUpdateTemplateRisk,
} from '@/features/risk-assessment';
import { PermissionWrapper } from '@/features/shared';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export const TemplateRiskDetail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const assessmentId = router.query
    .assessmentId as string;

  const [tabKey, setTabKey] = useState('base-info');

  const { data, isError, isLoading } = useGetTemplateRisk(
    { assessmentId }
  );
  const { submit } = useUpdateTemplateRisk({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskTemplate.notifications
            .update
        ) as string,
      });
    },
    assessmentId,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onUpdate = () => {
    const value = form.getFieldsValue();
    submit(value);
  };

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .detailTitle
            }
          />
        }
        subtitle={data?.name}
        onBack={router.back}
        extra={
          <PermissionWrapper
            moduleName={'assessment'}
            policies={[
              permissions[
                'pdpakit:assessment:templaterisk:update'
              ],
            ]}
          >
            <Button
              type="primary"
              onClick={() => onUpdate()}
              hidden={tabKey !== 'base-info'}
            >
              <IntlMessage id={tokens.common.save} />
            </Button>
          </PermissionWrapper>
        }
      />
      <TemplateRiskDescriptions data={data} />
      <TemplateRiskDetal
        form={form}
        onChangTab={(e) => setTabKey(e)}
        assessmentId={assessmentId}
      />
    </FallbackError>
  );
};

TemplateRiskDetail.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TemplateRiskDetail;
