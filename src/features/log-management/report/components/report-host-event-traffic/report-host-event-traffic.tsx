import { css } from '@emotion/css';
import { Card, Empty } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useListHostEventTraffic } from '../../api/list-host-event-traffic';
import { ReportFilter } from '../../types';
import { ReportExportChart } from '../report-export-chart';

import { ReportHostEventTrafficChart } from './report-host-event-traffic-chart';

type ReportHostEventTrafficProps = {
  filter: ReportFilter;
};

export const ReportHostEventTraffic = ({
  filter,
}: ReportHostEventTrafficProps) => {
  const { data, isLoading, isError } =
    useListHostEventTraffic({
      module: 'LM',
      type: 'csv',
      report_type: 'count',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'event',
        limit: 10,
      },
    });

  const reportColumns = [
    { key: 'hostname', label: 'Host' },
    { key: 'event', label: 'Event Count' },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.report.eventTrafficByHost" />
        }
        loading={isLoading}
        extra={
          data &&
          data.length > 0 && (
            <ReportExportChart
              data={data}
              columns={reportColumns}
              filename="report_SIEM_event_traffic_by_host"
            />
          )
        }
        className={css`
          height: 100%;
          margin-bottom: 0;

          .ant-card-body {
            height: calc(100% - 60px);
            display: flex;
            align-items: center;
          }
        `}
      >
        {data && data.length > 0 ? (
          <ReportHostEventTrafficChart data={data} />
        ) : (
          <Empty className="mx-auto" />
        )}
      </Card>
    </FallbackError>
  );
};
