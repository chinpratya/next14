import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Row,
  Tabs,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  IncidentTemplateInfo,
  useGetIncidentTemplate,
  useUpdateIncidentTemplate,
  IncidentTemplateStatusDialog,
  IncidentTemplateEventForm,
  useUpdateIncidentTemplateEventForm,
} from '@/features/data-breach';
import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';
import { PermissionWrapper } from '@/features/shared';
import { permissions } from '@/permissions';

const IncidentTemplateDetailPage = () => {
  const { t } = useTranslation();

  const [activeTabKey, setActiveTabKey] =
    useState<string>('info');

  const router = useRouter();

  const toggle = useToggle();

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:incidenttemplate:update'
      ],
    ],
  });

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const [form] = Form.useForm();

  const incidentTemplateId = router.query
    .incidentTemplateId as string;

  const { data, isLoading, isError } =
    useGetIncidentTemplate(incidentTemplateId);

  const updateIncidentTemplate =
    useUpdateIncidentTemplate({
      incidentTemplateId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.incidentTemplate
              .notifications.update
          ) as string,
        });
      },
    });

  const updateIncidentTemplateEventForm =
    useUpdateIncidentTemplateEventForm({
      incidentTemplateId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.dataBreach.incidentTemplate
              .notifications.updateForm
          ) as string,
        });
      },
    });

  useEffect(() => {
    form.setFieldsValue(data);
    return () => {
      form.resetFields();
    };
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const onUpdateIncidentTemplate = async () => {
    try {
      await form.validateFields();
      updateIncidentTemplate.submit(
        form.getFieldsValue()
      );
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  const onUpdateIncidentTemplateEventForm = () => {
    updateIncidentTemplateEventForm.submit(
      queryClient.getQueryData([
        dataBreachQueryKeys.incidentTemplate.eventForm(
          incidentTemplateId
        ),
      ]) as Record<string, unknown>
    );
  };

  const tabItems = [
    {
      label: (
        <IntlMessage
          id={
            tokens.dataBreach.incidentTemplate.basicInfo
          }
        />
      ),
      key: 'info',
      children: (
        <Row>
          <Col {...getColLayout(12)}>
            <IncidentTemplateInfo form={form} />
          </Col>
        </Row>
      ),
    },
    {
      label: (
        <IntlMessage
          id={tokens.dataBreach.incidentTemplate.builder}
        />
      ),
      key: 'builder',
      children: (
        <>
          <IncidentTemplateEventForm
            incidentTemplateId={incidentTemplateId}
          />
        </>
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage
            id={tokens.dataBreach.incidentTemplate.detail}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:incidenttemplate:update'
              ],
            ]}
          >
            <Button
              type="primary"
              onClick={
                activeTabKey === 'info'
                  ? onUpdateIncidentTemplate
                  : onUpdateIncidentTemplateEventForm
              }
              loading={
                updateIncidentTemplate.isLoading ||
                updateIncidentTemplateEventForm.isLoading
              }
            >
              <IntlMessage id={tokens.common.save} />
            </Button>
          </PermissionWrapper>
        }
      />
      <Card
        title={
          <IntlMessage
            id={
              tokens.dataBreach.incidentTemplate.basicInfo
            }
          />
        }
      >
        <Descriptions layout="vertical" colon={false}>
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.dataBreach.incidentTemplate
                    .createdDt
                }
              />
            }
          >
            <ShowTagDate date={data?.createdDt} />
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <Typography.Text>
                <IntlMessage
                  id={
                    tokens.dataBreach.incidentTemplate
                      .updatedDt
                  }
                />
                :{' '}
              </Typography.Text>
            }
          >
            <ShowTagDate date={data?.updatedDt} />
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <Typography.Text>
                  <IntlMessage
                    id={
                      tokens.dataBreach.incidentTemplate
                        .status
                    }
                  />
                  :{' '}
                </Typography.Text>
                <Button
                  type="link"
                  className="p-0 ml-1"
                  style={{
                    height: '20px',
                  }}
                  onClick={() => toggle.change()}
                  disabled={!editPermission.isAllow}
                >
                  <EditOutlined />
                </Button>
              </>
            }
          >
            <ShowTagStatus
              status={data?.status}
              items={[
                {
                  key: 'inactive',
                  label: tokens.common.status.inactive,
                  color: 'rgba(69,85,96,0.55)',
                },
              ]}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <Tabs
          activeKey={activeTabKey}
          onChange={setActiveTabKey}
          items={tabItems}
        />
      </Card>
      <IncidentTemplateStatusDialog
        incidentTemplateId={incidentTemplateId}
        open={toggle.openChange}
        onClose={() => toggle.change()}
        currentStatus={data?.status}
      />
    </FallbackError>
  );
};

IncidentTemplateDetailPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default IncidentTemplateDetailPage;
