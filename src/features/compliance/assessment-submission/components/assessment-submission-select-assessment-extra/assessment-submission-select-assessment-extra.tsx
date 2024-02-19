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

import { useCreateAssessmentSubmission } from '../../api/create-assessment-submission';
import { usePublishAssessmentSubmission } from '../../api/publish-assessment-submission';

type AssessmentSubmissionSelectAssessmentExtraProps = {
  current: number;
  form: FormInstance;
  getValues: () => Record<string, unknown>;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
};

export const AssessmentSubmissionSelectAssessmentExtra =
  ({
    current,
    form,
    getValues,
    onNext,
    onPrevious,
    onCancel,
  }: AssessmentSubmissionSelectAssessmentExtraProps) => {
    const { t } = useTranslation();
    const { showNotification } = useNotifications();

    const onSuccess = () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.assessmentSubmission.create.success'
        ) as string,
      });
      onCancel();
    };

    const publishAssessmentSubmission =
      usePublishAssessmentSubmission({
        onSuccess,
      });

    const createAssessmentSubmission =
      useCreateAssessmentSubmission({
        onSuccess,
      });

    const createPublishAssessmentSubmission =
      useCreateAssessmentSubmission({
        isPublish: true,
        onSuccess(ObjectUUID) {
          publishAssessmentSubmission.submit(ObjectUUID);
        },
      });

    const items: MenuProps['items'] = [
      {
        label: (
          <Typography.Text
            onClick={() => onSubmitDraft()}
          >
            <IntlMessage id="compliance.assessmentSubmission.save.draft" />
          </Typography.Text>
        ),
        key: 'draft',
      },
      {
        label: (
          <Typography.Text
            onClick={() => onSubmitPublish()}
          >
            <IntlMessage id="compliance.assessmentSubmission.save.publish" />
          </Typography.Text>
        ),
        key: 'publish',
      },
    ];

    const onSubmitDraft = async () => {
      await form.validateFields();
      const payload = getValues();

      const respondents = payload?.respondents as [];
      if (respondents?.length < 1) {
        showNotification({
          type: 'error',
          message: 'ต้องมีผู้ตอบแบบประเมินอย่างน้อย 1 คน',
        });
        return;
      }

      createAssessmentSubmission.submit({
        ...payload,
        isDraft: true,
      });
    };

    const onSubmitPublish = async () => {
      await form.validateFields();
      const values = getValues();
      const payload = {
        ...values,
        isDraft: false,
      };

      if (!values.isSchedule) {
        createAssessmentSubmission.submit(payload);
        return;
      }

      createPublishAssessmentSubmission.submit(payload);
    };

    return (
      <>
        <Button className="mr-2" onClick={onPrevious}>
          {current === 0 ? (
            <IntlMessage id="compliance.assessmentSubmission.cancel" />
          ) : (
            <IntlMessage id="compliance.assessmentSubmission.back" />
          )}
        </Button>
        {current === 2 ? (
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={['click']}
          >
            <Button
              type="primary"
              loading={
                createAssessmentSubmission.isLoading ||
                createPublishAssessmentSubmission.isLoading ||
                publishAssessmentSubmission.isLoading
              }
            >
              <IntlMessage id="compliance.assessmentSubmission.save" />
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={onNext}>
            <IntlMessage id="compliance.assessmentSubmission.next" />
          </Button>
        )}
      </>
    );
  };
