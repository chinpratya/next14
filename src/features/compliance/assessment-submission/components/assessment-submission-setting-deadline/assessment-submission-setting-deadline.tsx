import {
  Divider,
  Form,
  FormInstance,
  Switch,
  Typography,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

const DatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

export type AssessmentSubmissionSettingDeadlineProps = {
  form?: FormInstance;
  loading?: boolean;
  isEditor?: boolean;
  isDisable?: boolean;
};

export const AssessmentSubmissionSettingDeadline = ({
  form,
  loading,
  isEditor,
  isDisable,
}: AssessmentSubmissionSettingDeadlineProps) => {
  const { t } = useTranslation();
  const [disable, setDisable] = useState(false);

  const isSchedule =
    Form.useWatch('isSchedule', form) ?? true;
  const scheduleDt = Form.useWatch('scheduleDt', form);

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
    if (isEditor && scheduleDt)
      setDisable(dayjs().isAfter(scheduleDt));
  }, [isEditor, scheduleDt]);

  return (
    <>
      <DescriptionBlock
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.setting.isSchedule" />
        }
        divider={false}
        className="pl-4"
        description={
          <Typography.Text className="text-gray-light">
            <IntlMessage id="compliance.assessmentSubmission.detail.setting.isSchedule.desc" />
          </Typography.Text>
        }
        extra={
          <Form.Item
            initialValue={false}
            name="isSchedule"
            className="mb-0"
            valuePropName="checked"
          >
            <Switch
              checkedChildren={
                <IntlMessage id="compliance.assessmentSubmission.detail.setting.on" />
              }
              unCheckedChildren={
                <IntlMessage id="compliance.assessmentSubmission.detail.setting.off" />
              }
              defaultChecked
              loading={loading}
              disabled={disable || isDisable}
            />
          </Form.Item>
        }
      />

      {isSchedule && (
        <>
          <Divider />
          <Form.Item
            className="pl-4"
            label={
              <IntlMessage id="compliance.assessmentSubmission.detail.setting.scheduleDt" />
            }
            name="scheduleDt"
            rules={[
              validation.required(
                t(
                  'compliance.assessmentSubmission.detail.setting.scheduleDtRequired'
                )
              ),
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm"
              minuteStep={30}
              showTime={{
                format: 'HH:mm',
                defaultValue: getDefaultTime(),
              }}
              placeholder={
                t(
                  'compliance.assessmentSubmission.detail.setting.scheduleDtPlaceholder'
                ) as string
              }
              disabledDate={(current) =>
                current.isBefore(
                  dayjs()
                    .startOf('day')
                    .subtract(0, 'day')
                )
              }
              disabled={disable || isDisable || loading}
            />
          </Form.Item>
        </>
      )}
    </>
  );
};
