import {
  EditOutlined,
  ExceptionOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import {
  Button,
  Card,
  Descriptions,
  Typography,
} from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { RequestDetail } from '../../types';
import { RequestChangeStatus } from '../request-change-status';
import { RequestFormModal } from '../request-form-modal';
import { RequestRejectInfoModal } from '../request-reject-info-modal';
import { RequestStatus } from '../request-status';

export type RequestInfoProps = {
  data?: RequestDetail;
  isPermission?: boolean;
};

const DATA_MAPPING_ACTIVITY =
  '/apps/datafence/data-mapping/activity';

export const RequestInfo = ({
  data,
  isPermission,
}: RequestInfoProps) => {
  const [showRequestForm, toggleRequestForm] =
    useToggle();
  const [isChangeStatus, toggleChangeStatus] =
    useToggle();
  const [
    isShowMoreRequestInfo,
    toggleShowMoreRequestInfo,
  ] = useToggle([false, true]);
  const [isShowRejectInfo, toggleShowRejectInfo] =
    useToggle([false, true]);

  return (
    <>
      <Card
        title={
          <Flex align="center">
            <Typography.Title level={4} className="mb-0">
              <IntlMessage id="dsarAutomation.request.detail.title" />
            </Typography.Title>
            <Typography.Link
              className="ml-2"
              style={{
                fontWeight: 'normal',
                fontSize: '14px',
              }}
              onClick={() => toggleShowMoreRequestInfo()}
            >
              {!isShowMoreRequestInfo ? (
                <>
                  <IntlMessage id="dsarAutomation.request.detail.seeDetail" />
                  <EyeOutlined className="ml-1" />
                </>
              ) : (
                <>
                  <IntlMessage id="dsarAutomation.request.detail.HideDetail" />
                  <EyeInvisibleOutlined className="ml-1" />
                </>
              )}
            </Typography.Link>
          </Flex>
        }
        extra={
          <Button
            icon={<ExceptionOutlined />}
            danger
            onClick={() => toggleShowRejectInfo()}
          >
            <IntlMessage id="dsarAutomation.request.detail.reason" />
          </Button>
        }
      >
        <Descriptions
          column={{
            xxl: 5,
            xl: 4,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
          layout="vertical"
          labelStyle={{
            fontWeight: 'bold',
          }}
        >
          <Descriptions.Item
            label={
              <IntlMessage id="dsarAutomation.request.requestId" />
            }
          >
            {data?.requestID ?? '-'}
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
              <IntlMessage id="dsarAutomation.request.identifyType" />
            }
          >
            {data?.identifyType}
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
              <IntlMessage id="dsarAutomation.request.activityName" />
            }
          >
            <Typography.Link
              href={`${DATA_MAPPING_ACTIVITY}/${data?.activityID}`}
              target="_blank"
            >
              {data?.activityName}
            </Typography.Link>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="dsarAutomation.request.requestState" />
            }
          >
            {data?.requestState}
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
              <IntlMessage id="dsarAutomation.request.tagName" />
            }
          >
            {data?.tagName?.join(', ')}
          </Descriptions.Item>
        </Descriptions>
        {isShowMoreRequestInfo ? (
          <Descriptions
            column={{
              xxl: 5,
              xl: 4,
              lg: 3,
              md: 3,
              sm: 2,
              xs: 1,
            }}
            layout="vertical"
            labelStyle={{
              fontWeight: 'bold',
            }}
          >
            <Descriptions.Item
              label={
                <IntlMessage id="dsarAutomation.request.numberOfEnd" />
              }
            >
              {data?.numberOfEnd}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="dsarAutomation.request.doubleOptIn" />
              }
            >
              {data?.DoubleOptIn ? (
                <IntlMessage id="dsarAutomation.request.open" />
              ) : (
                <IntlMessage id="dsarAutomation.request.close" />
              )}
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
                <IntlMessage id="dsarAutomation.request.endDate" />
              }
            >
              <ShowTagDate date={data?.endDate} />
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
                <IntlMessage id="dsarAutomation.request.status" />
              }
            >
              <>
                <RequestStatus
                  status={data?.requestStatus}
                />
                {isPermission ? (
                  <Typography.Link
                    href="#"
                    className="font-size-md ml-1"
                    onClick={() => toggleChangeStatus()}
                  >
                    <EditOutlined />
                  </Typography.Link>
                ) : null}
              </>
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </Card>
      <RequestFormModal
        requestId={data?.requestID}
        open={showRequestForm}
        onClose={() => toggleRequestForm()}
      />
      <RequestChangeStatus
        open={isChangeStatus}
        onClose={() => toggleChangeStatus()}
        requestId={data?.requestID ?? ''}
      />
      <RequestRejectInfoModal
        open={isShowRejectInfo}
        onClose={() => toggleShowRejectInfo()}
      />
    </>
  );
};
