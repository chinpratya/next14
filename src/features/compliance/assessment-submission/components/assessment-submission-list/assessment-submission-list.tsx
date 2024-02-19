import { Card, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListAssessmentSubmission } from '../../api/list-assessment-submission';
import { usePublishAssessmentSubmission } from '../../api/publish-assessment-submission';
import { AssessmentSubmission } from '../../types';
import { AssessmentSubmissionConfirmModal } from '../assessment-submission-confirm-modal';
import { AssessmentSubmissionSelectAssessmentModal } from '../assessment-submission-select-assessment-modal';

import { AssessmentSubmissionListTable } from './assessment-submission-list-table';

export type AssessmentSubmissionListProps = {
  search?: string;
};

export const AssessmentSubmissionList = ({
  search,
}: AssessmentSubmissionListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<AssessmentSubmission>();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useListAssessmentSubmission({
      search,
      page,
      pageSize,
    });

  const publishAssessmentSubmission =
    usePublishAssessmentSubmission({
      onSuccess() {
        showNotification({
          type: 'success',
          message: t(
            'compliance.notification.assessmentSubmission.send'
          ) as string,
        });
        toggle.change();
      },
    });

  if (publishAssessmentSubmission.isLoading) {
    Modal.destroyAll();
  }

  const onPublish = () => {
    publishAssessmentSubmission.submit(
      toggle.data.ObjectUUID as string
    );
  };

  return (
    <FallbackError isError={isError}>
      <Card>
        <AssessmentSubmissionListTable
          isLoading={isLoading}
          dataSource={data?.data ?? []}
          onPublish={toggle.change}
          onSelected={() => toggle.choose()}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <AssessmentSubmissionSelectAssessmentModal
          open={toggle.openChoose}
          onCancel={toggle.choose}
        />
        <AssessmentSubmissionConfirmModal
          open={toggle.openChange}
          onCancel={toggle.change}
          onSubmit={onPublish}
          width={450}
          header={
            <IntlMessage id="compliance.assessmentSubmission.detail.respondent.confirm" />
          }
          loading={publishAssessmentSubmission.isLoading}
        />
      </Card>
    </FallbackError>
  );
};
