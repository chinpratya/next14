import { Card, Col, Row, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  useGetRequest,
  RequestInfo,
  RequestRightsStages,
  RequestTaskList,
  RequestAttachments,
  RequestHistory,
  RequestComment,
} from '@/features/dsar-automation';
import { AppLayout } from '@/layouts';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const RequestDetailPage = () => {
  const router = useRouter();

  const requestId = router.query.requestId as string;

  const { data, isLoading, isError } =
    useGetRequest(requestId);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const isPermission = data?.isPermission;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="dsarAutomation.request.detail.title" />
        }
        subtitle={data?.requestID}
      />
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
            currentStageId={data?.currecnt_stateID ?? ''}
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
            workflowID={data?.workflowID as string}
          />
          <Card>
            <Tabs
              items={[
                {
                  key: 'comment-external',
                  label: (
                    <IntlMessage id="dsarAutomation.request.detail.commentExternal" />
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
                    <IntlMessage id="dsarAutomation.request.detail.commentInternal" />
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
                    <IntlMessage id="dsarAutomation.request.detail.attachment" />
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
                    <IntlMessage id="dsarAutomation.request.detail.history" />
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
    </FallbackError>
  );
};

RequestDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default RequestDetailPage;
