import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Card, Descriptions, Typography } from 'antd';

import { tokens } from '@/lang';
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
              <IntlMessage
                id={tokens.dataBreach.request.detail}
              />
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
                  <IntlMessage
                    id={
                      tokens.dataBreach.request.seeDetail
                    }
                  />
                  <EyeOutlined className="ml-1" />
                </>
              ) : (
                <>
                  <IntlMessage
                    id={
                      tokens.dataBreach.request.hideDetail
                    }
                  />
                  <EyeInvisibleOutlined className="ml-1" />
                </>
              )}
            </Typography.Link>
          </Flex>
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
              <IntlMessage
                id={tokens.dataBreach.request.requestId}
              />
            }
          >
            {data?.requestID ?? '-'}
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
                id={
                  tokens.dataBreach.request
                    .dataSubjectIdentifier
                }
              />
            }
          >
            {data?.identifyType ?? '-'}
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
                id={
                  tokens.dataBreach.request.requestState
                }
              />
            }
          >
            {data?.requestState}
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
                id={tokens.dataBreach.request.tags}
              />
            }
          >
            {data?.tagName?.join(', ')}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage
                id={tokens.dataBreach.request.numberOfEnd}
              />
            }
          >
            {data?.numberOfEnd?.value ?? '-'}{' '}
            {data?.numberOfEnd?.type ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage
                id={
                  tokens.dataBreach.request.identification
                }
              />
            }
          >
            {data?.DoubleOptIn ? (
              <IntlMessage
                id={tokens.common.status.open}
              />
            ) : (
              <IntlMessage
                id={tokens.common.status.close}
              />
            )}
          </Descriptions.Item>
          {isShowMoreRequestInfo ? (
            <>
              <Descriptions.Item
                label={
                  <IntlMessage
                    id={
                      tokens.dataBreach.request.createdDt
                    }
                  />
                }
              >
                <ShowTagDate date={data?.createdDt} />
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
                        .timeReminded
                    }
                  />
                }
              >
                {data?.timeReminded}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage
                    id={
                      tokens.dataBreach.request
                        .requestInfo
                    }
                  />
                }
              >
                <Typography.Link
                  onClick={() => toggleRequestForm()}
                >
                  <IntlMessage
                    id={
                      tokens.dataBreach.request
                        .clickRequestInfo
                    }
                  />
                </Typography.Link>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage
                    id={tokens.dataBreach.request.status}
                  />
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
            </>
          ) : null}
        </Descriptions>
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
