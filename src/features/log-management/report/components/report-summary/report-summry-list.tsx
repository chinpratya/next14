import { Card } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  useGetSummaryOrganization,
  useListEventSummary,
  useListSummaryIncident,
} from '@/features/siem';

import { ReportFilter } from '../../types';

import { ReportSummaryOrgTable } from './report-summary-org-table';
import { ReportSummaryTable } from './report-summry-table';

type ReportSummaryListProps = {
  filter: ReportFilter;
};

export const ReportSummaryList = ({
  filter,
}: ReportSummaryListProps) => {
  const { data, isError, isLoading } =
    useListEventSummary({
      module: 'LM',
      type: 'csv',
      report_type: 'summary',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'event',
        limit: 10,
      },
    });

  const listIndices = useListSummaryIncident({
    module: 'LM',
    type: 'csv',
    report_type: 'indices',
    filter: {
      from: filter.timestamp.from,
      to: filter.timestamp.to,
      indices: filter.indices,
      hosts: filter.hostname,
      type: 'event',
      limit: 10,
    },
  });

  const summaryOrg = useGetSummaryOrganization({
    module: 'LM',
    type: 'csv',
    report_type: 'summary_org',
    filter: {
      from: filter.timestamp.from,
      to: filter.timestamp.to,
      indices: filter.indices,
      hosts: filter.hostname,
      type: 'event',
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
          <IntlMessage id="logManagement.report.summaryReport" />
        }
      >
        <ReportSummaryOrgTable
          dataSource={
            summaryOrg.data ? [summaryOrg.data] : []
          }
        />
        <ReportSummaryTable
          dataSource={listIndices.data}
          eventSummary={data ?? {}}
        />
      </Card>
    </FallbackError>
  );
};
