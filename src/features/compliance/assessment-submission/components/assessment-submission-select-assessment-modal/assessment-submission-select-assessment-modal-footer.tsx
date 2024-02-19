import {
  Button,
  Dropdown,
  FormInstance,
  MenuProps,
  Typography,
} from 'antd';

import { useNotifications } from '@/stores/notifications';

import { useCreateAssessmentSubmission } from '../../api/create-assessment-submission';
import { usePublishAssessmentSubmission } from '../../api/publish-assessment-submission';

type AssessmentSubmissionSelectAssessmentModalFooterProps =
  {
    current: number;
    form: FormInstance;
    getValues: () => Record<string, unknown>;
    onNext: () => void;
    onPrevious: () => void;
    onCancel: () => void;
  };

export const AssessmentSubmissionSelectAssessmentModalFooter =
  ({
    current,
    form,
    getValues,
    onNext,
    onPrevious,
    onCancel,
  }: AssessmentSubmissionSelectAssessmentModalFooterProps) => {
    const { showNotification } = useNotifications();

    const onSuccess = () => {
      showNotification({
        type: 'success',
        message: 'บันทึกข้อมูลสำเร็จ',
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
            บันทึกแบบร่าง
          </Typography.Text>
        ),
        key: 'draft',
      },
      {
        label: (
          <Typography.Text
            onClick={() => onSubmitPublish()}
          >
            บันทึกเสร็จสิ้น
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
          {current === 0 ? 'ยกเลิก' : 'ย้อนกลับ'}
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
              บันทึก
            </Button>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={onNext}>
            ถัดไป
          </Button>
        )}
      </>
    );
  };
