import { FallbackError } from '@/components/util-components/fallback-error';
import { useListSizeSummary } from '@/features/siem';

import { ReportFilter } from '../../types';

import { ReportSummaryChart } from './report-summry-chart';
import { ReportSummaryList } from './report-summry-list';

type ReportSummaryProps = {
  filter: ReportFilter;
};

export const ReportSummary = ({
  filter,
}: ReportSummaryProps) => {
  const { data, isLoading, isError } = useListSizeSummary(
    {
      module: 'LM',
      type: 'csv',
      report_type: 'date',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'event',
      },
    }
  );

  return (
    <FallbackError isError={isError}>
      <ReportSummaryChart
        data={data ?? []}
        loading={isLoading}
      />
      <ReportSummaryList filter={filter} />
    </FallbackError>
  );
};
