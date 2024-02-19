import { Divider, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';

import { useUpdateAssessmentSubmissionSettingDate } from '../../api/update-assessment-submission-setting-date';
import { useUpdateAssessmentSubmissionSettingNotification } from '../../api/update-assessment-submission-setting-notification';
import { useUpdateAssessmentSubmissionSettingSchedule } from '../../api/update-assessment-submission-setting-schedule';
import {
  AssessmentSubmissionSetting,
  AssessmentSubmissionSettingDate,
} from '../../types';
import { AssessmentSubmissionSettingDeadline } from '../assessment-submission-setting-deadline';
import { AssessmentSubmissionSettingNotification } from '../assessment-submission-setting-notification';
import { AssessmentSubmissionSettingSchedule } from '../assessment-submission-setting-schedule';

export type AssessmentSubmissionSettingsProps = {
  assessmentId: string;
  assessmentStatus: string;
  data?: AssessmentSubmissionSetting;
};

type Notification = {
  notiType?: string;
  notiDt?: Dayjs;
};

export const AssessmentSubmissionSettings = ({
  assessmentId,
  assessmentStatus,
  data,
}: AssessmentSubmissionSettingsProps) => {
  const [form] = Form.useForm();
  const dateDt = Form.useWatch('dateDt', form);
  const scheduleDt = Form.useWatch('scheduleDt', form);
  const { showNotification } = useNotifications();

  const isDisable = !['draft'].includes(assessmentStatus);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: 'บันทึกข้อมูลสำเร็จ',
    });
  };

  const updateSettingDate =
    useUpdateAssessmentSubmissionSettingDate({
      assessmentSubmissionId: assessmentId,
      onSuccess,
    });

  const updateSettingNotification =
    useUpdateAssessmentSubmissionSettingNotification({
      assessmentSubmissionId: assessmentId,
      onSuccess,
    });

  const updateSettingSchedule =
    useUpdateAssessmentSubmissionSettingSchedule({
      assessmentSubmissionId: assessmentId,
      onSuccess,
    });

  const onChangeValue = (
    data: AssessmentSubmissionSettingDate
  ) => {
    const key = Object.keys(data);
    if (
      key.includes('dateDt') ||
      key.includes('isSetDt')
    ) {
      onChangeDate(data);
    } else if (
      key.includes('isNotification') ||
      key.includes('notifications')
    ) {
      onChangeNotifications(data);
    } else {
      onChangeSchedule();
    }
  };

  const onChangeDate = (
    data: AssessmentSubmissionSettingDate
  ) => {
    const [from, to] = data?.dateDt ?? [];
    if (data.isSetDt && (!from || !to)) return;

    if (
      scheduleDt &&
      from &&
      (from?.isSame(scheduleDt) ||
        !from?.isAfter(scheduleDt))
    ) {
      return;
    }

    const payload = {
      isSetDt: data.isSetDt ?? true,
      startDt: from
        ? from.format('YYYY-MM-DD HH:mm:ss')
        : '',
      endDt: to ? to.format('YYYY-MM-DD HH:mm:ss') : '',
    };
    updateSettingDate.submit(payload);
  };

  const onChangeNotifications = (
    data: AssessmentSubmissionSettingDate
  ) => {
    if (data.isNotification === false) {
      updateSettingNotification.submit({
        isNotification: false,
      });
      return;
    }

    const notifications = form.getFieldValue(
      'notifications'
    ) as Notification[];

    const deadlineIndex = notifications.findIndex(
      (item: Notification) =>
        item?.notiType === 'on_deadline'
    );

    if (deadlineIndex > -1 && dateDt) {
      const values = form.getFieldsValue();
      notifications[deadlineIndex] = {
        ...notifications[deadlineIndex],
        notiDt: dateDt[1],
      };
      form?.setFieldsValue({ ...values, notifications });
    }

    if (data.isNotification && !data.notifications)
      return;

    const isValid = notifications.every(
      (item) => item?.notiType && item?.notiDt
    );

    if (!isValid) return;

    updateSettingNotification.submit({
      isNotification: true,
      notifications: notifications
        ? notifications.map((item) => ({
            notiType: item.notiType ?? '',
            notiDt: dayjs(item.notiDt).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
          }))
        : [],
    });
  };

  const onChangeSchedule = () => {
    const isSchedule = form.getFieldValue('isSchedule');
    const scheduleDt = form.getFieldValue('scheduleDt');

    if (isSchedule && !scheduleDt) return;
    const payload = {
      isSchedule,
      scheduleDt: isSchedule
        ? dayjs(scheduleDt).format('YYYY-MM-DD HH:mm:ss')
        : '',
    };
    if (dayjs(scheduleDt) < dayjs()) {
      return showNotification({
        type: 'error',
        message:
          'เวลากำหนดส่งแบบประเมิน ต้องมากกว่าปัจจุบัน',
      });
    }
    updateSettingSchedule.submit(payload);
  };

  useEffect(() => {
    if (data) {
      const { data: value } = data;
      form.setFieldsValue({
        ...data,
        isSetDt: value.isSetDt ?? false,
        dateDt: value.startDt &&
          value.endDt && [
            dayjs(value.startDt),
            dayjs(value.endDt),
          ],
        isNotification: value.isNotification ?? false,
        notifications: value.notifications?.map(
          (item) => ({
            ...item,
            notiDt: dayjs(item.notiDt),
          })
        ),
        isSchedule: value.isSchedule ?? false,
        scheduleDt:
          value.scheduleDt && dayjs(value.scheduleDt),
      });
    }

    return () => {
      form.resetFields();
    };
  }, [data, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      className="mt-4"
      onValuesChange={onChangeValue}
    >
      <AssessmentSubmissionSettingDeadline
        isEditor
        isDisable={isDisable}
        loading={updateSettingSchedule.isLoading}
      />
      <Divider />
      <AssessmentSubmissionSettingSchedule
        loading={updateSettingDate.isLoading}
        isDisable={isDisable}
      />
      <Divider />
      <AssessmentSubmissionSettingNotification
        data={data}
        isDisable={isDisable}
        loading={updateSettingNotification.isLoading}
      />
    </Form>
  );
};
