import { Divider, Typography } from 'antd';

import { useAuth } from '@/stores/auth';
import { FallbackError } from '@utilComponents/fallback-error';

// eslint-disable-next-line import/no-cycle
import { useGetRanking } from '../../api/get-assessment-ranking';
import { PortalAssessment } from '../../types/assessment';

import { RankingReportRemark } from './ranking-report-remark';
import { RankingReportTable } from './ranking-report-table';

export type RankingReportProps = {
  assessmentId: string;
  assessment?: PortalAssessment;
};
export const RankingReport = ({
  assessmentId,
  assessment,
}: RankingReportProps) => {
  const { data, isLoading, isError } = useGetRanking({
    assessmentId,
    type: 'brand',
  });
  const { role } = useAuth();

  return (
    <FallbackError isError={isError}>
      <Typography.Title level={3} className="mt-4 mb-0">
        ค่าเฉลี่ยแต่ละหน่วยงานของ{assessment?.name}
      </Typography.Title>
      <RankingReportTable
        loading={isLoading}
        ranking={data?.data}
        meta={data?.meta}
      />
      <Divider />
      {role !== 'respondent' ? (
        <RankingReportRemark loading={isLoading} />
      ) : null}
    </FallbackError>
  );
};
