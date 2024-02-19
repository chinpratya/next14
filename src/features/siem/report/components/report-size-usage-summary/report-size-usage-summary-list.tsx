import { Card } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useGetSummaryOrganization } from '../../api/get-summary-organization';
import { useListEventSummary } from '../../api/list-event-summary';
import { useListSummaryIncident } from '../../api/list-summary-incident';
import { Option, ReportFilter } from '../../types';

import { ReportSizeUsageSummaryOrgTable } from './report-size-usage-summary-org-table';
import { ReportSizeUsageSummaryTable } from './report-size-usage-summary-table';

type ReportSizeUsageSummaryListProps = {
  data: Option[];
  loading?: boolean;
  filter: ReportFilter;
};

export const ReportSizeUsageSummaryList = ({
  filter,
}: ReportSizeUsageSummaryListProps) => {
  const { data, isError, isLoading } =
    useListEventSummary({
      module: 'SIEM',
      type: 'csv',
      report_type: 'summary',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'size',
        limit: 10,
      },
    });

  const listIndices = useListSummaryIncident({
    module: 'SIEM',
    type: 'csv',
    report_type: 'indices',
    filter: {
      from: filter.timestamp.from,
      to: filter.timestamp.to,
      indices: filter.indices,
      hosts: filter.hostname,
      type: 'size',
      limit: 10,
    },
  });

  const summaryOrg = useGetSummaryOrganization({
    module: 'SIEM',
    type: 'csv',
    report_type: 'summary_org',
    filter: {
      from: filter.timestamp.from,
      to: filter.timestamp.to,
      indices: filter.indices,
      hosts: filter.hostname,
      type: 'size',
    },
  });

  return (
    <FallbackError
      isError={
        isError &&
        listIndices.isError &&
        summaryOrg.isError
      }
    >
      <Card
        loading={
          isLoading &&
          listIndices.isLoading &&
          summaryOrg.isLoading
        }
        title={
          <IntlMessage id="siem.reportSummary.reportMainPageSummarySizeUsage" />
        }
      >
        <ReportSizeUsageSummaryOrgTable
          dataSource={
            summaryOrg.data ? [summaryOrg.data] : []
          }
        />
        <ReportSizeUsageSummaryTable
          dataSource={listIndices.data}
          eventSummary={data ?? {}}
        />
      </Card>
    </FallbackError>
  );
};
