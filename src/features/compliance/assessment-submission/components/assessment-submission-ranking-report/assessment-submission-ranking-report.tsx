import { useSetState } from '@mantine/hooks';
import { Select, Typography } from 'antd';

import { useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetAssessmentSubmissionRanking } from '../../api/get-assessment-submission-ranking';

import { AssessmentSubmissionRankingReportTable } from './assessment-submission-ranking-report-table';

export type AssessmentSubmissionRankingReportProps = {
  assessmentId: string;
};

const reportTypeOptions = [
  {
    label: 'องค์กร',
    value: 'organization',
  },
  {
    label: 'หน่วยงาน',
    value: 'department',
  },
];

type ReportType = 'organization' | 'department';
type RankingReportState = {
  reportType: ReportType;
};

export const AssessmentSubmissionRankingReport = ({
  assessmentId,
}: AssessmentSubmissionRankingReportProps) => {
  const { search, debouncedSearch, onSearch } =
    useSearch();
  const [state, setState] =
    useSetState<RankingReportState>({
      reportType: 'organization',
    });

  const { data, isLoading, isError } =
    useGetAssessmentSubmissionRanking({
      assessmentId,
      type: state.reportType,
      search: debouncedSearch,
    });

  const onReportTypeChange = (reportType: ReportType) => {
    setState({ reportType });
  };

  return (
    <>
      <Flex
        justifyContent="between"
        className="mt-2 mb-2"
      >
        <Typography.Title level={4}>
          ค่าเฉลี่ยของแต่ละหน่วยงาน
        </Typography.Title>
        <div>
          <Select
            value={state.reportType}
            onChange={onReportTypeChange}
            style={{ width: 150 }}
            options={reportTypeOptions}
            className="mr-2"
          />
          <InputSearch
            placeholder="ค้นหาชื่อโรงพยาบาล"
            onSearch={onSearch}
            search={search}
          />
        </div>
      </Flex>
      <FallbackError isError={isError}>
        <AssessmentSubmissionRankingReportTable
          loading={isLoading}
          ranking={data?.data}
          meta={data?.meta}
        />
      </FallbackError>
    </>
  );
};
