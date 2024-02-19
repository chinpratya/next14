import { Timeline } from 'antd';

import { Loading } from '@components/loading';

import { useGetAssessmentSubmissionRespondentLog } from '../../api/get-assessment-submission-respondents-log';

export type AssessmentSubmissionRespondentModalHistoryProps =
  {
    assessmentId: string;
    respondentId: string;
  };

export const AssessmentSubmissionRespondentModalHistory =
  ({
    assessmentId,
    respondentId,
  }: AssessmentSubmissionRespondentModalHistoryProps) => {
    const { data, isLoading } =
      useGetAssessmentSubmissionRespondentLog(
        assessmentId,
        respondentId
      );

    if (isLoading) {
      return <Loading cover="content" />;
    }

    return (
      <Timeline mode="alternate">
        <Timeline.Item label={data?.createdDt}>
          {data?.message}
        </Timeline.Item>
        <Timeline.Item label={data?.createdDt}>
          {data?.message}
        </Timeline.Item>
        <Timeline.Item label={data?.createdDt}>
          {data?.message}
        </Timeline.Item>
      </Timeline>
    );
  };
