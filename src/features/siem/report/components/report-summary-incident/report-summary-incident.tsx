import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { ReportExportChart } from '@/features/log-management';
import { formatNumber } from '@/utils';

import { useListSummaryIncident } from '../../api/list-summary-incident';
import { Option, ReportFilter } from '../../types';
import { ReportPieTable } from '../report-pie-table';

import { ReportSummaryIncidentChart } from './report-summary-incident-chart';

type ReportSummaryIncidentProps = {
  filter: ReportFilter;
};

export type DataSource = Option & {
  key?: string;
  color?: string;
};

export const ReportSummaryIncident = ({
  filter,
}: ReportSummaryIncidentProps) => {
  const [dataSource, setDataSource] = useState<
    DataSource[]
  >([
    {
      key: 'CRITICAL',
      label: 'siem.overview.critical',
      value: 0,
      color: '#E52916',
    },
    {
      key: 'HIGH',
      label: 'siem.overview.high',
      value: 0,
      color: '#FA8C16',
    },
    {
      key: 'MEDIUM',
      label: 'siem.overview.medium',
      value: 0,
      color: '#FFC542',
    },
    {
      key: 'LOW',
      label: 'siem.overview.low',
      value: 0,
      color: '#0DD182',
    },
  ]);
  const { data, isLoading, isError } =
    useListSummaryIncident({
      module: 'SIEM',
      type: 'csv',
      report_type: 'count',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'incident',
        limit: 10,
      },
    });

  useEffect(() => {
    if (data) {
      const value = [
        ...(dataSource.map((item) => {
          const value = data.find(
            (data) => data.label === item.key
          );
          return { ...item, value: value?.value ?? 0 };
        }) as DataSource[]),
        {
          key: 'TOTAL',
          label: 'siem.totla',
          value: data.reduce(
            (a, b) => a + (b.value as number),
            0
          ),
          color: '#fff',
        },
      ];
      setDataSource(value);
    }
  }, [data]);

  const reportColumns = [
    { key: 'label', label: 'Severity' },
    { key: 'value', label: 'Count' },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.reportSummary.summaryIncident" />
        }
        loading={isLoading}
        extra={
          data &&
          data.length > 0 && (
            <ReportExportChart
              data={data}
              columns={reportColumns}
              filename="report_SIEM_summary_incident"
            />
          )
        }
        className="h-100 mb-0"
      >
        {data && data.length > 0 ? (
          <Flex align="center" gap="md">
            <ReportPieTable
              rowKey="label"
              loading={isLoading}
              data={dataSource ?? []}
              columns={[
                {
                  key: 'name',
                  title: (
                    <IntlMessage id="siem.overview.severity" />
                  ),
                  ellipsis: true,
                  render(value: DataSource) {
                    return (
                      <Flex align="center" gap="15px">
                        <span
                          className={css`
                            display: block;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: ${value.color};
                            margin-left: 6px;
                          `}
                        />
                        <IntlMessage id={value.label} />
                      </Flex>
                    );
                  },
                },
                {
                  key: 'count',
                  title: (
                    <IntlMessage id="siem.overview.count" />
                  ),
                  dataIndex: 'value',
                  align: 'center',
                  render: (value: number) =>
                    formatNumber(value),
                },
              ]}
            />
            <ReportSummaryIncidentChart
              data={dataSource.slice(0, 4) ?? []}
            />
          </Flex>
        ) : (
          <Empty />
        )}
      </Card>
    </FallbackError>
  );
};
