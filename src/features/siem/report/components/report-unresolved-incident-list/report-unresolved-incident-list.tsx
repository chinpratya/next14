import { Card } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useListUnresolvedIncident } from '../../api/list-unresolved-incident';
import { ReportFilter } from '../../types';

import { ReportUnresolvedIncidentTable } from './report-unresolved-incident-table';

type ReportUnresolvedIncidentListProps = {
  filter: ReportFilter;
};

export const ReportUnresolvedIncidentList = ({
  filter,
}: ReportUnresolvedIncidentListProps) => {
  const { data, isError, isLoading } =
    useListUnresolvedIncident({
      module: 'SIEM',
      type: 'csv',
      report_type: 'lists',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'incident',
        limit: 25,
      },
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.reportSummary.reportMainPageUnresolve" />
        }
      >
        <ReportUnresolvedIncidentTable
          dataSource={data}
          loading={isLoading}
        />
      </Card>
    </FallbackError>
  );
};
