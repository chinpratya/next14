import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePagination } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAssessmentSubmissionRespondentChangeApprover } from '../../api/assessment-submission-respondents-change-approver';
import { useListOrganizationUnitAssessmentApprovers } from '../../api/list-organization-unit-assessment-approver';
import { AssessmentSubmissionRespondents } from '../../types';

export type AssessmentSubmissionRespondentChangeApproverModalProps =
  {
    assessmentId: string;
    respondent: AssessmentSubmissionRespondents;
    respondentId: string[];
    open: boolean;
    navigation: { organization: string; branch: string };
    onCancel: () => void;
  };

export const AssessmentSubmissionRespondentChangeApproverModal =
  ({
    assessmentId,
    respondentId,
    respondent,
    navigation,
    open,
    onCancel,
  }: AssessmentSubmissionRespondentChangeApproverModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();
    const { page, pageSize } = usePagination({
      pageSize: 100,
    });

    const { data, isLoading, isError } =
      useListOrganizationUnitAssessmentApprovers({
        organizationID: navigation.organization,
        branchID: navigation.branch,
        page,
        pageSize,
      });

    const listApproverOptions = data?.data.map(
      (approver) => ({
        label: approver.name,
        value: approver.ObjectUUID,
      })
    );

    const changeApprover =
      useAssessmentSubmissionRespondentChangeApprover({
        assessmentId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: t(
              'compliance.notification.assessmentSubmission.respondent.changeApprover'
            ) as string,
          });
          onCancel();
        },
      });

    const onChangeApprover = async () => {
      await form.validateFields();
      const values = form.getFieldsValue();
      const respondents =
        respondentId.length < 1
          ? [respondent.ObjectUUID]
          : respondentId;
      changeApprover.submit({ ...values, respondents });
    };

    useEffect(() => {
      if (!open) form.resetFields();
    }, [open, form]);

    return (
      <Modal
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.changeApprover.title" />
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
          loading: changeApprover.isLoading,
        }}
        onOk={onChangeApprover}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="newApproverID"
            label={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.changeApprover.newApprover" />
            }
            rules={[
              validation.required(
                t(
                  'compliance.assessmentSubmission.detail.respondent.changeApprover.newApproverRequired'
                )
              ),
            ]}
          >
            <Select options={listApproverOptions} />
          </Form.Item>
          <Form.Item
            name="reason"
            label={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.changeApprover.reason" />
            }
            rules={[
              validation.required(
                t(
                  'compliance.assessmentSubmission.detail.respondent.changeApprover.reasonRequired'
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
