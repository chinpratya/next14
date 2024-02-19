import { useToggle } from '@mantine/hooks';
import { Descriptions, Skeleton, Typography } from 'antd';

import { tokens } from '@/lang';
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
        layout="vertical"
      >
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.requestId}
            />
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
            <IntlMessage
              id={tokens.dataBreach.task.workingPeriod}
            />
          }
        >
          {data?.numberOfEnd?.value}
          <IntlMessage id={tokens.dataBreach.task.day} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.requestInfo}
            />
          }
        >
          <Typography.Link
            onClick={() => toggleRequestForm()}
          >
            <IntlMessage
              id={
                tokens.dataBreach.request.clickRequestInfo
              }
            />
          </Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.createdDt}
            />
          }
        >
          <ShowTagDate date={data?.createdDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.requestType}
            />
          }
        >
          {data?.typeOfRequest}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.endDate}
            />
          }
        >
          <ShowTagDate date={data?.endDate} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.dataBreach.request
                  .dataSubjectIdentifier
              }
            />
          }
        >
          {data?.identifyType}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.timeReminded}
            />
          }
        >
          {data?.timeReminded}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.dataSubject}
            />
          }
        >
          {data?.identify}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.webformName}
            />
          }
        >
          {data?.webformName}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.requestState}
            />
          }
        >
          {data?.requestState}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.request.tags}
            />
          }
        >
          {data?.tagName}
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
