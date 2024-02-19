import { FallbackError } from '@/components/util-components/fallback-error';

import { useListSizeSummary } from '../../api/list-size-summary';
import { ReportFilter } from '../../types';

import { ReportEventUsageSummaryChart } from './report-event-usage-summary-chart';
import { ReportEventUsageSummaryList } from './report-event-usage-summary-list';

type ReportEventUsageSummaryProps = {
  filter: ReportFilter;
};

export const ReportEventUsageSummary = ({
  filter,
}: ReportEventUsageSummaryProps) => {
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
        type: 'event',
      },
    }
  );

  return (
    <FallbackError isError={isError}>
      <ReportEventUsageSummaryChart
        data={data ?? []}
        loading={isLoading}
      />
      <ReportEventUsageSummaryList
        data={data ?? []}
        loading={isLoading}
        filter={filter}
      />
    </FallbackError>
  );
};
