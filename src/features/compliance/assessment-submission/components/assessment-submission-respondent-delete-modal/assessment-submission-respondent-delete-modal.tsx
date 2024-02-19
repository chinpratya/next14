import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteAssessmentSubmissionRespondent } from '../../api/delete-assessment-submission-respondents';

export type AssessmentSubmissionRespondentDeleteModalProps =
  {
    assessmentId: string;
    respondentId: string;
    open: boolean;
    onCancel: () => void;
  };

export const AssessmentSubmissionRespondentDeleteModal =
  ({
    assessmentId,
    respondentId,
    open,
    onCancel,
  }: AssessmentSubmissionRespondentDeleteModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const deleteRespondent =
      useDeleteAssessmentSubmissionRespondent({
        assessmentId,
        respondentId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.assessmentSubmission.respondent.delete'
            ) as string,
          });
          onCancel();
        },
      });

    const onDeleteRespondent = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      deleteRespondent.submit(values.reason);
    };

    return (
      <Modal
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.cancel.title" />
        }
        open={open}
        onCancel={onCancel}
        width={750}
        okText={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.submit" />
        }
        okButtonProps={{
          danger: true,
          loading: deleteRespondent.isLoading,
        }}
        onOk={onDeleteRespondent}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="reason"
            label={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.cancel.reason" />
            }
            rules={[
              validation.required(
                t(
                  'compliance.assessmentSubmission.detail.respondent.cancel.reasonRequired'
                )
              ),
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder={
                t(
                  'compliance.assessmentSubmission.detail.respondent.cancelPlaceholder'
                ) as string
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
