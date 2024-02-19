import { css } from '@emotion/css';
import { Tabs } from 'antd';

import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetAssessmentSubmissionRespondent } from '../../api/get-assessment-submission-respondents';
// import { AssessmentSubmissionRespondentModalHistory } from '../assessment-submission-respondent-modal-history';
import { AssessmentSubmissionRespondentModalOverview } from '../assessment-submission-respondent-modal-overview';

export type AssessmentSubmissionRespondentsModalProps = {
  assessmentId: string;
  respondentId: string;
  open?: boolean;
  onCancel?: () => void;
};

export const AssessmentSubmissionRespondentsModal = ({
  assessmentId,
  respondentId,
  open,
  onCancel,
}: AssessmentSubmissionRespondentsModalProps) => {
  const { data, isLoading, isError } =
    useGetAssessmentSubmissionRespondent(
      assessmentId,
      respondentId
    );

  return (
    <Modal
      title={
        <IntlMessage id="compliance.assessmentSubmission.detail.respondent.detail.title" />
      }
      isError={isError}
      loading={isLoading}
      open={open}
      onCancel={onCancel}
      width={1000}
      footer={null}
      centered
      destroyOnClose
    >
      <Tabs
        className={css`
          margin-top: -16px;
        `}
        items={[
          {
            label: (
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.detail.overview" />
            ),
            key: 'overview',
            children: (
              <AssessmentSubmissionRespondentModalOverview
                data={data}
              />
            ),
          },
          // {
          //   label: 'ประวัติการทำงาน',
          //   key: 'history',
          //   children: (
          //     <AssessmentSubmissionRespondentModalHistory
          //       assessmentId={assessmentId}
          //       respondentId={respondentId}
          //     />
          //   ),
          // },
        ]}
      />
    </Modal>
  );
};
