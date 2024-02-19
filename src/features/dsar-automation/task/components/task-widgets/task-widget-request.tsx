import { useToggle } from '@mantine/hooks';
import { Descriptions, Skeleton, Typography } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  useGetRequest,
  RequestFormModal,
} from '../../../request';

export type TaskWidgetRequestProps = {
  requestId: string;
};

export const TaskWidgetRequest = ({
  requestId,
}: TaskWidgetRequestProps) => {
  const { data, isLoading, isError } =
    useGetRequest(requestId);

  const [showRequestForm, toggleRequestForm] =
    useToggle();

  if (isLoading) {
    return <Skeleton active className="mt-4 mb-4" />;
  }

  const requestURL = (requestId?: string) =>
    requestId
      ? `/apps/datafence/dsar-automation/request/${requestId}`
      : `#`;

  const activityURL = (activityId?: string) =>
    activityId
      ? `/apps/datafence/data-mapping/activity/${activityId}`
      : `#`;

  return (
    <FallbackError isError={isError}>
      <Descriptions
        column={{
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        className="mt-4"
        labelStyle={{
          fontWeight: 'bold',
          marginBottom: 8,
        }}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.requestId" />
          }
        >
          <Typography.Link
            href={requestURL(data?.requestID)}
            target="_blank"
          >
            {data?.requestID}
          </Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.numberOfEnd" />
          }
        >
          {data?.numberOfEnd}
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.day" />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.requestInfo" />
          }
        >
          <Typography.Link
            onClick={() => toggleRequestForm()}
          >
            <IntlMessage id="dsarAutomation.request.click" />
          </Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.createdDt" />
          }
        >
          <ShowTagDate date={data?.createdDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.typeOfRequest" />
          }
        >
          {data?.typeOfRequest}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.endDate" />
          }
        >
          <ShowTagDate date={data?.endDate} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.identifyType" />
          }
        >
          {data?.identifyType}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.timeReminded" />
          }
        >
          {data?.timeReminded}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.identify" />
          }
        >
          {data?.identify}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.webFormName" />
          }
        >
          {data?.webformName}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.activityName" />
          }
        >
          <Typography.Link
            href={activityURL(data?.activityID)}
            target="_blank"
          >
            {data?.activityName}
          </Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.tagWebForm" />
          }
        >
          {data?.tagName}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.request.requestState" />
          }
        >
          {data?.requestState}
        </Descriptions.Item>
      </Descriptions>
      <RequestFormModal
        requestId={data?.requestID}
        open={showRequestForm}
        onClose={() => toggleRequestForm()}
      />
    </FallbackError>
  );
};
