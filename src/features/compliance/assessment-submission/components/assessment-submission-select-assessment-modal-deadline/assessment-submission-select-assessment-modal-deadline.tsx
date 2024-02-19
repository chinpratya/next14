import { Divider, FormInstance } from 'antd';

import { AssessmentSubmissionSettingDeadline } from '../assessment-submission-setting-deadline';
import { AssessmentSubmissionSettingNotification } from '../assessment-submission-setting-notification';
import { AssessmentSubmissionSettingSchedule } from '../assessment-submission-setting-schedule';

type AssessmentSubmissionSelectAssessmentModalDeadlineProps =
  {
    form: FormInstance;
  };

export const AssessmentSubmissionSelectAssessmentModalDeadline =
  ({
    form,
  }: AssessmentSubmissionSelectAssessmentModalDeadlineProps) => {
    return (
      <>
        <AssessmentSubmissionSettingDeadline />
        <Divider />
        <AssessmentSubmissionSettingSchedule />
        <Divider />
        <AssessmentSubmissionSettingNotification
          form={form}
        />
        <Divider />
      </>
    );
  };
