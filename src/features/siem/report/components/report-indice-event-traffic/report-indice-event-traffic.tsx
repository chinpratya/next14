import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { ReportExportChart } from '@/features/log-management';
import { formatNumber } from '@/utils';

import { constant } from '../../../shared';
import { useListIndiceEventTraffic } from '../../api/list-indice-event-traffic';
import { ReportFilter } from '../../types';
import { ReportPieTable } from '../report-pie-table';

import { ReportIndiceEventTrafficChart } from './report-indice-event-traffic-chart';

type ReportIndiceEventTrafficProps = {
  filter: ReportFilter;
};

export const ReportIndiceEventTraffic = ({
  filter,
}: ReportIndiceEventTrafficProps) => {
  const { data, isLoading, isError } =
    useListIndiceEventTraffic({
      module: 'SIEM',
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

  const reportColumns = [
    { key: 'label', label: 'Name Indices' },
    { key: 'value', label: 'Event Count' },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.reportSummary.top10EventTrafficByIndices" />
        }
        loading={isLoading}
        extra={
          data &&
          data.length > 0 && (
            <ReportExportChart
              data={data}
              columns={reportColumns}
              filename="report_SIEM_event_traffic_by_indices"
            />
          )
        }
        className="mb-0 h-100"
      >
        {data && data.length > 0 ? (
          <Flex align="center" gap="md">
            <ReportPieTable
              rowKey="label"
              loading={isLoading}
              data={data ?? []}
              columns={[
                {
                  key: 'name',
                  title: (
                    <IntlMessage id="siem.reportSummary.nameIndices" />
                  ),
                  dataIndex: 'label',
                  ellipsis: true,
                  render(value, _, index) {
                    return (
                      <Flex align="center" gap="15px">
                        <span
                          className={css`
                            display: block;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: ${constant
                              .color[index]};
                            margin-left: 6px;
                          `}
                        />
                        {value}
                      </Flex>
                    );
                  },
                },
                {
                  key: 'count',
                  title: (
                    <IntlMessage id="siem.reportSummary.eventCount" />
                  ),
                  dataIndex: 'value',
                  align: 'center',
                  render: (value: number) =>
                    formatNumber(value),
                },
              ]}
            />

            <ReportIndiceEventTrafficChart
              data={data ?? []}
            />
          </Flex>
        ) : (
          <Empty />
        )}
      </Card>
    </FallbackError>
  );
};
