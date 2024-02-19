import { useToggle } from '@mantine/hooks';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Row,
  Tabs,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import {
  useGetRequest,
  RequestInfo,
  RequestRightsStages,
  RequestTaskList,
  RequestAttachments,
  RequestHistory,
  RequestComment,
  RequestRiskMatrix,
  RequestIncidentTemplate,
  useUpdateRequestIncidentTemplate,
  IncidentTemplateEventFormType,
  RequestIncidentTemplateSentDialog,
} from '@/features/data-breach';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';
import { PermissionWrapper } from '@/features/shared';
import { permissions } from '@/permissions';

const RequestDetailPage = () => {
  const router = useRouter();

  const { showNotification } = useNotifications();

  const requestId = router.query.requestId as string;

  const [activeTabKey, setActiveTabKey] =
    useState<string>('request-info');

  const [
    openSentIncidentTemplate,
    toggleSentIncidentTemplate,
  ] = useToggle();

  const { data, isLoading, isError } =
    useGetRequest(requestId);

  const updateRequestIncidentTemplate =
    useUpdateRequestIncidentTemplate({
      requestId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message:
            'Updated incident template successfully.',
        });
      },
    });

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const onUpdateIncident = () =>
    updateRequestIncidentTemplate.submit(
      queryClient.getQueryData([
        dataBreachQueryKeys.request.incidentTemplate(
          requestId
        ),
      ]) as IncidentTemplateEventFormType
    );

  const isPermission = data?.isPermission;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage
            id={tokens.dataBreach.request.detail}
          />
        }
        subtitle={data?.requestID}
        overlap
        extra={
          activeTabKey === 'request-incident-template' &&
          data?.isSentTemplate ? (
            <PermissionWrapper
              moduleName={'databreach'}
              policies={[
                permissions[
                  'pdpakit:databreach:request:update'
                ],
              ]}
            >
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'save',
                      label: (
                        <IntlMessage
                          id={
                            tokens.dataBreach.request.save
                          }
                        />
                      ),
                      onClick: () => onUpdateIncident(),
                    },
                    {
                      key: 'publish',
                      label: (
                        <IntlMessage
                          id={
                            tokens.dataBreach.request
                              .publish
                          }
                        />
                      ),
                      onClick: () =>
                        toggleSentIncidentTemplate(),
                    },
                  ],
                }}
              >
                <Button
                  loading={
                    updateRequestIncidentTemplate.isLoading
                  }
                  type="primary"
                >
                  <IntlMessage id={tokens.common.save} />
                </Button>
              </Dropdown>
            </PermissionWrapper>
          ) : null
        }
      />
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        items={[
          {
            key: 'request-info',
            label: (
              <IntlMessage
                id={tokens.dataBreach.request.basicInfo}
              />
            ),
            children: (
              <Row gutter={[16, 0]}>
                <Col {...getColLayout(24)}>
                  <RequestInfo
                    data={data}
                    isPermission={isPermission}
                  />
                </Col>
                <Col {...getColLayout(6)}>
                  <RequestRightsStages
                    requestId={requestId}
                    currentStageId={
                      data?.currecnt_stateID ?? ''
                    }
                    stages={data?.states}
                    isHideNextButton={
                      ['close', 'reject'].includes(
                        data?.requestStatus ?? ''
                      ) || !isPermission
                    }
                  />
                </Col>
                <Col {...getColLayout(18)}>
                  <RequestTaskList
                    requestId={requestId}
                    stateId={data?.currecnt_stateID ?? ''}
                    workflowID={
                      data?.workflowID as string
                    }
                  />
                  <Card>
                    <Tabs
                      items={[
                        {
                          key: 'comment-external',
                          label: (
                            <IntlMessage
                              id={
                                tokens.dataBreach.request
                                  .commentExternal
                              }
                            />
                          ),
                          children: (
                            <RequestComment
                              requestId={requestId}
                              defaultUsertype="external"
                              disabledChangeUsertype
                            />
                          ),
                        },
                        {
                          key: 'comment-internal',
                          label: (
                            <IntlMessage
                              id={
                                tokens.dataBreach.request
                                  .commentInternal
                              }
                            />
                          ),
                          children: (
                            <RequestComment
                              requestId={requestId}
                              defaultUsertype="internal"
                              disabledChangeUsertype
                            />
                          ),
                        },
                        {
                          key: 'attachment',
                          label: (
                            <IntlMessage
                              id={
                                tokens.dataBreach.request
                                  .attachment
                              }
                            />
                          ),
                          children: (
                            <RequestAttachments
                              requestId={requestId}
                            />
                          ),
                        },
                        {
                          key: 'history',
                          label: (
                            <IntlMessage
                              id={
                                tokens.dataBreach.request
                                  .history
                              }
                            />
                          ),
                          children: (
                            <RequestHistory
                              requestId={requestId}
                            />
                          ),
                        },
                      ]}
                    />
                  </Card>
                </Col>
              </Row>
            ),
          },
          {
            key: 'request-risk-matrix',
            label: (
              <IntlMessage
                id={tokens.dataBreach.request.riskMatrix}
              />
            ),
            disabled: !data?.showRiskAssessment,
            children: (
              <RequestRiskMatrix requestId={requestId} />
            ),
          },
          {
            key: 'request-incident-template',
            label: (
              <IntlMessage
                id={
                  tokens.dataBreach.request
                    .incidentTemplate
                }
              />
            ),
            disabled: !data?.showSentTemplate,
            children: (
              <RequestIncidentTemplate
                requestId={requestId}
              />
            ),
          },
        ]}
      />
      <RequestIncidentTemplateSentDialog
        requestId={requestId}
        open={openSentIncidentTemplate}
        onClose={() => toggleSentIncidentTemplate()}
      />
    </FallbackError>
  );
};

RequestDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default RequestDetailPage;
