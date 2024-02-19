import { FallbackError } from '@/components/util-components/fallback-error';

import { useListSizeSummary } from '../../api/list-size-summary';
import { ReportFilter } from '../../types';

import { ReportSizeUsageSummaryChart } from './report-size-usage-summary-chart';
import { ReportSizeUsageSummaryList } from './report-size-usage-summary-list';

type ReportSizeUsageSummaryProps = {
  filter: ReportFilter;
};

export const ReportSizeUsageSummary = ({
  filter,
}: ReportSizeUsageSummaryProps) => {
  const { data, isLoading, isError } = useListSizeSummary(
    {
      module: 'SIEM',
      type: 'csv',
      report_type: 'date',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'size',
      },
    }
  );

  return (
    <FallbackError isError={isError}>
      <ReportSizeUsageSummaryChart
        data={data ?? []}
        loading={isLoading}
      />
      <ReportSizeUsageSummaryList
        data={data ?? []}
        loading={isLoading}
        filter={filter}
      />
    </FallbackError>
  );
};
