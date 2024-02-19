import {
  Cascader,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Skeleton,
} from 'antd';
import { CascaderProps } from 'antd/lib/cascader';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GREY_PRIMARY_COLOR,
  PROCESSING_COLOR,
  RED_PRIMARY_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import { tokens } from '@/lang';
import { Meta } from '@/types';
import { getColLayout } from '@/utils';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetTaskMeta } from '../../api/get-task-meta';
import { TaskMeta } from '../../types';

const getStatusOptions = (
  currentStatus: string,
  options?: Meta[]
) => {
  const label = (status: string) => (
    <ShowTagStatus
      status={status}
      bordered={false}
      items={[
        {
          label: tokens.common.status.open,
          key: 'open',
          color: GREY_PRIMARY_COLOR,
        },
        {
          label: tokens.common.status.inProgress,
          key: 'in_progress',
          color: PROCESSING_COLOR,
        },
        {
          label: tokens.common.status.close,
          key: 'close',
          color: SUCCESS_COLOR,
        },
        {
          label: tokens.common.status.reject,
          key: 'reject',
          color: RED_PRIMARY_COLOR,
        },
      ]}
    />
  );

  return options?.map((status) => ({
    value: status.ObjectUUID,
    disabled:
      status.ObjectUUID === 'open' ||
      status.ObjectUUID === currentStatus,
    label: label(status.ObjectUUID),
  }));
};

const getResolutionOptions = (
  status: string,
  meta?: TaskMeta
): CascaderProps['options'] => {
  if (status === 'close') {
    return meta?.reasonForClose?.map((reason) => ({
      value: reason.ObjectUUID,
      label: reason.name,
      children: reason?.reason?.map((subReason) => ({
        value: subReason.ObjectUUID,
        label: subReason.name,
      })),
    }));
  }

  if (status === 'reject') {
    return meta?.reasonForReject?.map((reason) => ({
      value: reason.ObjectUUID,
      label: reason.name,
      children: reason?.reason?.map((subReason) => ({
        value: subReason.ObjectUUID,
        label: subReason.name,
      })),
    }));
  }

  return [];
};

const ALLOW_RESOLUTION_STATUS = ['close', 'reject'];

export type TaskWidgetStatusProps = {
  form: FormInstance;
  isReadOnly?: boolean;
};

export const TaskWidgetStatus = ({
  form,
  isReadOnly,
}: TaskWidgetStatusProps) => {
  const { t } = useTranslation();
  const {
    data: meta,
    isLoading,
    isError,
  } = useGetTaskMeta();

  const status = Form.useWatch('status', form);

  useEffect(() => {
    form.resetFields(['taskResolution']);
  }, [form, status]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <FallbackError isError={isError}>
      <Row gutter={[24, 24]}>
        <Col {...getColLayout(8)}>
          <Form.Item
            label={
              <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.status" />
            }
            name="status"
          >
            <Select
              disabled={isReadOnly}
              className="w-100"
              options={getStatusOptions(
                status,
                meta?.status
              )}
            />
          </Form.Item>
        </Col>
        {ALLOW_RESOLUTION_STATUS.includes(status) && (
          <Col {...getColLayout(16)}>
            <Form.Item
              shouldUpdate={(prev, current) =>
                prev?.resolutionCloseJob !==
                current?.resolutionCloseJob
              }
              noStyle
            >
              {({ getFieldValue }) => {
                return (
                  <Form.Item
                    label={
                      <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.resolution" />
                    }
                    name="taskResolution"
                    rules={[
                      {
                        required: getFieldValue(
                          'resolutionCloseJob'
                        ),
                        message: t(
                          'dsarAutomation.request.detail.task.assign.basicInfo.resolutionValidation'
                        ) as string,
                      },
                    ]}
                  >
                    <Cascader
                      disabled={isReadOnly}
                      className="w-100"
                      options={getResolutionOptions(
                        status,
                        meta
                      )}
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
        )}
      </Row>
      {ALLOW_RESOLUTION_STATUS.includes(status) && (
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.message" />
          }
          name="massage"
        >
          <Input.TextArea
            readOnly={isReadOnly}
            rows={4}
          />
        </Form.Item>
      )}
    </FallbackError>
  );
};
