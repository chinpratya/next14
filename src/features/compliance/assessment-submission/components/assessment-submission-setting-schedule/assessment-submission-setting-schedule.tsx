import { css } from '@emotion/css';
import {
  Divider,
  Form,
  FormInstance,
  Switch,
  Typography,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

const RangePicker = dynamic(
  () =>
    import('@/components/share-components/range-picker'),
  { ssr: false }
);

export type AssessmentSubmissionSettingScheduleProps = {
  form?: FormInstance;
  loading?: boolean;
  isDisable?: boolean;
};

export const AssessmentSubmissionSettingSchedule = ({
  form,
  loading,
  isDisable,
}: AssessmentSubmissionSettingScheduleProps) => {
  const { t } = useTranslation();
  const isSetDt = Form.useWatch('isSetDt', form) ?? true;

  const getDefaultTime = (
    isSchedule: boolean,
    scheduleDt?: Dayjs
  ): Dayjs[] => {
    let hour: number;
    let minute: string;

    if (scheduleDt && isSchedule) {
      hour = scheduleDt.hour();
      minute = scheduleDt.minute().toString();
    } else {
      hour = dayjs().startOf('hour').hour();
      minute = dayjs()
        .startOf('minute')
        .minute()
        .toString();
    }

    if (+minute > 30) {
      hour++;
      minute = '00';
    } else {
      minute = '30';
    }

    return [
      dayjs(`${hour}:${minute}`, 'HH:mm'),
      dayjs(`${hour}:${minute}`, 'HH:mm'),
    ];
  };

  const getDisableDate = (
    current: Dayjs,
    isSchedule: boolean,
    scheduleDt?: Dayjs
  ): boolean => {
    const date = isSchedule
      ? scheduleDt ?? dayjs()
      : dayjs();

    if (!date) return false;

    return current && current < date.startOf('day');
  };

  const onValidation = (
    value: Dayjs[] | null,
    isSchedule: boolean,
    scheduleDt: Dayjs
  ) => {
    if (!value) return Promise.resolve();

    const [from, to] = value as Dayjs[];
    if (isSchedule && scheduleDt) {
      if (
        from
          .startOf('m')
          .isBefore(scheduleDt.startOf('m'))
      ) {
        return Promise.reject(
          'ต้องกรอกมากกว่าเวลาส่งแบบประเมิน'
        );
      }
    }
    if (to.diff(from, 'day', true) < 1) {
      return Promise.reject('ช่วงเวลาอย่างน้อย 1 วัน');
    }
    return Promise.resolve();
  };

  return (
    <>
      <DescriptionBlock
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.setting.isSetDt" />
        }
        divider={false}
        className="pl-4"
        description={
          <Typography.Text className="text-gray-light">
            <IntlMessage id="compliance.assessmentSubmission.detail.setting.isSetDt.desc" />
          </Typography.Text>
        }
        extra={
          <Form.Item
            name="isSetDt"
            valuePropName="checked"
            className="mb-0"
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
              disabled={isDisable}
            />
          </Form.Item>
        }
      />
      {isSetDt && (
        <>
          <Divider />
          <Form.Item
            noStyle
            validateTrigger={['onBlur']}
            shouldUpdate={(prev, next) =>
              prev?.scheduleDt !== next?.scheduleDt
            }
          >
            {({ getFieldValue }) => (
              <Form.Item
                className="pl-4 mt-4"
                label={
                  <IntlMessage id="compliance.assessmentSubmission.detail.setting.dateDt" />
                }
                name="dateDt"
                rules={[
                  validation.required(
                    t(
                      'compliance.assessmentSubmission.detail.setting.dateDtRequired'
                    )
                  ),
                  {
                    validator: (_, value) =>
                      onValidation(
                        value,
                        getFieldValue('isSchedule'),
                        getFieldValue('scheduleDt')
                      ),
                  },
                ]}
              >
                <RangePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm"
                  showTime={{
                    format: 'HH:mm',
                    defaultValue: getDefaultTime(
                      getFieldValue(
                        'isSchedule'
                      ) as boolean,
                      getFieldValue('scheduleDt') as Dayjs
                    ),
                  }}
                  minuteStep={30}
                  disabledDate={(current) =>
                    getDisableDate(
                      current,
                      getFieldValue('isSchedule'),
                      getFieldValue('scheduleDt')
                    )
                  }
                  disabled={loading || isDisable}
                  className={css`
                    .ant-picker-input > input[disabled] {
                      background-color: #f7f7f8 !important;
                    }
                  `}
                />
              </Form.Item>
            )}
          </Form.Item>
        </>
      )}
    </>
  );
};
