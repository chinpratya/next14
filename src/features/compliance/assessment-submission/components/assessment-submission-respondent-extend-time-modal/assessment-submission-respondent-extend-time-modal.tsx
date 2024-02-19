import { css } from '@emotion/css';
import { Form, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAssessmentSubmissionRespondentExtendTime } from '../../api/assessment-submission-respondents-extend-time';
import { useGetAssessmentSubmissionRespondent } from '../../api/get-assessment-submission-respondents';

const RangePicker = dynamic(
  () =>
    import('@/components/share-components/range-picker'),
  {
    ssr: false,
  }
);

export type AssessmentSubmissionRespondentExtendTimeModalProps =
  {
    assessmentId: string;
    respondentId: string;
    open: boolean;
    onCancel: () => void;
  };

export const AssessmentSubmissionRespondentExtendTimeModal =
  ({
    assessmentId,
    respondentId,
    open,
    onCancel,
  }: AssessmentSubmissionRespondentExtendTimeModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const { data, isLoading, isError } =
      useGetAssessmentSubmissionRespondent(
        assessmentId,
        respondentId
      );

    const extendTime =
      useAssessmentSubmissionRespondentExtendTime({
        assessmentId,
        respondentId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.assessmentSubmission.extendTime'
            ) as string,
          });
          onCancel();
        },
      });

    const onExtendTime = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      const extendDt = values.dateDt[1] as Dayjs;

      extendTime.submit({
        extendDt: extendDt.format('YYYY-MM-DD HH:ss:mm'),
        reason: values.reason,
        isExtendTime: true,
      });
    };

    useEffect(() => {
      if (data) {
        form.setFieldsValue({
          dateDt: [
            dayjs(data.startDt),
            dayjs(data.endDt) ?? dayjs(),
          ],
        });
      }
    }, [data, form]);

    useEffect(() => {
      if (!open) {
        form.resetFields();
      }
    }, [open, form]);

    return (
      <Modal
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.extendTime.title" />
        }
        isError={isError}
        loading={isLoading}
        open={open}
        onCancel={onCancel}
        width={750}
        okText={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.submit" />
        }
        okButtonProps={{
          loading: extendTime.isLoading,
        }}
        onOk={onExtendTime}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.dateDt" />
            }
            required
            name="dateDt"
          >
            <RangePicker
              className={css`
                width: 100%;

                .ant-picker-input > input[disabled] {
                  background-color: #f7f7f8 !important;
                }
              `}
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              disabled={[true, false]}
              disabledDate={(current) =>
                dayjs().add(-1, 'days') >= current ||
                dayjs().add(1, 'month') <= current
              }
            />
          </Form.Item>
          <Form.Item
            name="reason"
            label={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.reason" />
            }
            rules={[
              validation.required(
                t(
                  'compliance.assessmentSubmission.detail.respondent.reasonRequired'
                )
              ),
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
