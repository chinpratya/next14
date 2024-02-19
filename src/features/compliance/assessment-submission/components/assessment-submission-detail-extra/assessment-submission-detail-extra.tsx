import {
  Button,
  Dropdown,
  FormInstance,
  MenuProps,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { usePublishAssessmentSubmission } from '../../api/publish-assessment-submission';
import { useUpdateAssessmentSubmissionDetail } from '../../api/update-assessment-submission-detail';
import { AssessmentSubmissionSetting } from '../../types';

type AssessmentSubmissionDetailExtraProps = {
  currentTab: string;
  form: FormInstance;
  assessmentStatus: string;
  assessmentId: string;
  assessmentSetting?: AssessmentSubmissionSetting;
  onSetFormUpdate: (value: boolean) => void;
};

export const AssessmentSubmissionDetailExtra = ({
  form,
  assessmentId,
  assessmentStatus,
  assessmentSetting,
  onSetFormUpdate,
}: AssessmentSubmissionDetailExtraProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'compliance.notification.assessmentSubmission.update'
      ) as string,
    });
    onSetFormUpdate(false);
  };

  const updateAssessmentSubmissionDetail =
    useUpdateAssessmentSubmissionDetail({
      assessmentSubmissionId: assessmentId,
      onSuccess,
    });

  const publishAssessmentSubmission =
    usePublishAssessmentSubmission({
      assessmentId,
      onSuccess,
    });

  const updatePublishAssessmentSubmission =
    useUpdateAssessmentSubmissionDetail({
      assessmentSubmissionId: assessmentId,
      isPublish: true,
      onSuccess: () => {
        publishAssessmentSubmission.submit(assessmentId);
      },
    });

  const items: MenuProps['items'] = [
    {
      label: (
        <Typography.Text onClick={() => onSubmit(true)}>
          <IntlMessage id="compliance.assessmentSubmission.save.draft" />
        </Typography.Text>
      ),
      key: 'draft',
    },
    {
      label: (
        <Typography.Text onClick={() => onSubmit(false)}>
          <IntlMessage id="compliance.assessmentSubmission.save.publish" />
        </Typography.Text>
      ),
      key: 'publish',
    },
  ];

  const onSubmit = async (draft?: boolean) => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const isSchedule = assessmentSetting?.data.isSchedule;

    if (draft) {
      updateAssessmentSubmissionDetail.submit({
        ...values,
        status: 'draft',
      });
    } else if (isSchedule) {
      updatePublishAssessmentSubmission.submit({
        ...values,
        status: 'draft',
      });
    } else {
      updateAssessmentSubmissionDetail.submit({
        ...values,
        status: 'ready_to_send',
      });
    }
  };

  if (
    assessmentStatus !== 'draft' &&
    !publishAssessmentSubmission.isLoading
  )
    return <></>;

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      trigger={['click']}
      className="ml-2"
    >
      <Button
        type="primary"
        loading={
          updateAssessmentSubmissionDetail.isLoading ||
          updatePublishAssessmentSubmission.isLoading ||
          publishAssessmentSubmission.isLoading
        }
      >
        <IntlMessage id="compliance.assessmentSubmission.save" />
      </Button>
    </Dropdown>
  );
};
