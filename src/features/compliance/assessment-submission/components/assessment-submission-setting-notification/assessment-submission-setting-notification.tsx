import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssessmentSubmissionSetting } from '../../types';

const DatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

const { Option } = Select;

type Notification = {
  notiDt?: Dayjs;
  notiType?: string;
};

export type AssessmentSubmissionSettingNotificationProps =
  {
    form?: FormInstance;
    loading?: boolean;
    data?: AssessmentSubmissionSetting;
    isDisable?: boolean;
  };

const notificationType = [
  {
    label: (
      <IntlMessage id="compliance.assessmentSubmission.detail.setting.notification.on" />
    ),
    value: 'on_deadline',
  },
  {
    label: (
      <IntlMessage id="compliance.assessmentSubmission.detail.setting.notification.before" />
    ),
    value: 'before_deadline',
  },
  {
    label: (
      <IntlMessage id="compliance.assessmentSubmission.detail.setting.notification.after" />
    ),
    value: 'after_deadlineWS',
  },
];

export const AssessmentSubmissionSettingNotification = ({
  form,
  data,
  loading,
  isDisable,
}: AssessmentSubmissionSettingNotificationProps) => {
  const { t } = useTranslation();
  const notificationValue = Form.useWatch(
    'notifications',
    form
  );
  const isNotification =
    Form.useWatch('isNotification', form) ?? true;

  const notifications = Form.useWatch(
    'notifications',
    form
  );

  const isSetDt = Form.useWatch('isSetDt', form) ?? true;
  const dateDt = Form.useWatch('dateDt', form);

  const [
    selectedNotificationType,
    setSelectedNotificationType,
  ] = useState<string[]>([]);

  const onDelete = (index: number) => {
    const selected = selectedNotificationType;
    selectedNotificationType.splice(index, 1);
    setSelectedNotificationType(selected);
  };

  const onChangeNotification = (
    type: string,
    index: number
  ) => {
    const selected = selectedNotificationType;
    selected[index] = type;
    setSelectedNotificationType(selected);
  };

  const getDefaultTime = (): Dayjs => {
    let hour = dayjs().hour();
    let minute = dayjs().minute().toString();
    if (+minute > 30) {
      hour++;
      minute = '00';
    } else {
      minute = '30';
    }
    return dayjs(`${hour}:${minute}`, 'HH:mm');
  };

  useEffect(() => {
    if (!notifications) return;

    const deadlineIndex = notifications.findIndex(
      (item: Notification) =>
        item?.notiType === 'on_deadline'
    );

    if (deadlineIndex < 0 || !dateDt) return;

    const values = form?.getFieldsValue();
    notifications[deadlineIndex] = {
      ...notifications[deadlineIndex],
      notiDt: dateDt[1],
    };

    form?.setFieldsValue({ ...values, notifications });
  }, [dateDt, form, notifications]);

  useEffect(() => {
    if (!isSetDt && isNotification) {
      const values = form?.getFieldsValue();
      form?.setFieldsValue({
        ...values,
        isNotification: false,
      });
    }
  }, [form, isNotification, isSetDt]);

  useEffect(() => {
    if (data?.data.notifications) {
      const selected = data.data.notifications?.map(
        (item) => item.notiType
      ) as string[];
      setSelectedNotificationType(selected);
    }
  }, [data]);

  return (
    <>
      <DescriptionBlock
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.setting.isNotification" />
        }
        divider={false}
        className="pl-4"
        description={
          <Typography.Text className="text-gray-light">
            <IntlMessage id="compliance.assessmentSubmission.detail.setting.isNotification" />
          </Typography.Text>
        }
        extra={
          <Form.Item
            className="mb-0"
            name="isNotification"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              checkedChildren={
                <IntlMessage id="compliance.assessmentSubmission.detail.setting.on" />
              }
              unCheckedChildren={
                <IntlMessage id="compliance.assessmentSubmission.detail.setting.off" />
              }
              loading={loading}
              disabled={isDisable || !isSetDt}
            />
          </Form.Item>
        }
      />
      {isNotification && (
        <>
          <Divider />
          <Form.List
            name="notifications"
            initialValue={[
              { notiType: undefined, notiDt: undefined },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(
                  (
                    { key, name, ...restField },
                    index
                  ) => (
                    <Row
                      key={key}
                      className="mb-4 pl-4"
                      gutter={[16, 16]}
                      align="bottom"
                    >
                      <Col
                        {...getColLayout([
                          24, 24, 24, 12, 12, 12,
                        ])}
                        style={{ height: '80px' }}
                      >
                        <Form.Item
                          {...restField}
                          className="mb-0"
                          label={
                            <IntlMessage id="compliance.assessmentSubmission.detail.setting.notification" />
                          }
                          name={[name, 'notiType']}
                          rules={[
                            validation.required(
                              t(
                                'compliance.assessmentSubmission.detail.setting.notificationRequired'
                              )
                            ),
                          ]}
                        >
                          <Select
                            placeholder={
                              t(
                                'compliance.assessmentSubmission.detail.setting.notificationPlaceholder'
                              ) as string
                            }
                            onChange={(value) =>
                              onChangeNotification(
                                value,
                                index
                              )
                            }
                            disabled={
                              loading || isDisable
                            }
                          >
                            {notificationType
                              .filter(
                                ({ value }) =>
                                  !selectedNotificationType.includes(
                                    value
                                  ) ||
                                  selectedNotificationType[
                                    index
                                  ] === value
                              )
                              .map(({ value, label }) => (
                                <Option
                                  key={value}
                                  value={value}
                                >
                                  {label}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col
                        {...getColLayout([
                          23, 23, 23, 11, 11, 11,
                        ])}
                        style={{ height: '50px' }}
                      >
                        <Form.Item
                          {...restField}
                          className="mb-0"
                          name={[name, 'notiDt']}
                          rules={[
                            validation.required(
                              t(
                                'compliance.assessmentSubmission.detail.setting.notiDtRequired'
                              )
                            ),
                          ]}
                        >
                          <DatePicker
                            className="w-100"
                            showTime={{
                              defaultValue:
                                getDefaultTime(),
                            }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={
                              t(
                                'compliance.assessmentSubmission.detail.setting.notiDtPlaceholder'
                              ) as string
                            }
                            minuteStep={30}
                            disabledDate={(current) =>
                              current.isBefore(
                                dayjs().subtract(1, 'day')
                              )
                            }
                            disabled={
                              loading ||
                              isDisable ||
                              notifications?.[index]
                                ?.notiType ===
                                'on_deadline'
                            }
                          />
                        </Form.Item>
                      </Col>
                      {isDisable ? null : (
                        <DeleteOutlined
                          className={css`
                            position: relative;
                            bottom: 23px !important;
                          `}
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(name);
                            }
                            onDelete(index);
                          }}
                        />
                      )}
                    </Row>
                  )
                )}

                <Form.Item className="pl-4">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    loading={loading}
                    disabled={
                      isDisable ||
                      notificationValue?.length >=
                        notificationType.length
                    }
                    icon={<PlusOutlined />}
                  >
                    <IntlMessage id="compliance.assessmentSubmission.detail.setting.add" />
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      )}
    </>
  );
};
