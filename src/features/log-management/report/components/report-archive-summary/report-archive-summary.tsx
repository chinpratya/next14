import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';
import { useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { formatNumber } from '@/utils';

import { COLORS } from '../../../../siem/shared/constant/color';
import { useListArchiveSummary } from '../../api/list-archive-summary';
import { Option, ReportFilter } from '../../types';
import { ReportExportChart } from '../report-export-chart';
import { ReportPieTable } from '../report-pie-table';

import { ReportArchiveSummaryChart } from './report-archive-summary-chart';

type ReportArchiveSummaryProps = {
  filter: ReportFilter;
};

export const ReportArchiveSummary = ({
  filter,
}: ReportArchiveSummaryProps) => {
  const [dataSource, setDataSource] = useState<Option[]>(
    []
  );

  const { data, isLoading, isError } =
    useListArchiveSummary({
      module: 'LM',
      type: 'csv',
      report_type: 'count',
      filter: {
        from: filter.timestamp.from,
        to: filter.timestamp.to,
        indices: filter.indices,
        hosts: filter.hostname,
        type: 'archive',
        limit: 10,
      },
    });

  useEffect(() => {
    if (data) {
      const value = [
        ...data,
        {
          label: 'Total',
          value: data.reduce(
            (a, b) => a + (b.value as number),
            0
          ),
        },
      ];
      setDataSource(value);
    }
  }, [data]);

  const reportColumns = [
    { key: 'label', label: 'Indices' },
    { key: 'value', label: 'Count' },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        className="h-100"
        title={
          <IntlMessage id="logManagement.report.archiveSummary" />
        }
        loading={isLoading}
        bodyStyle={{ height: 'calc(100% - 40px)' }}
        extra={
          data &&
          data.length > 0 && (
            <ReportExportChart
              data={data}
              defaultData={data}
              columns={reportColumns}
              filename="report_LM_archive_summary"
            />
          )
        }
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
                    <IntlMessage id="logManagement.indices.title" />
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
                            background-color: ${value ===
                            'Total'
                              ? '#fff'
                              : COLORS[index]};
                            margin-left: 6px;
                          `}
                        />
                        {value === 'Total' ? (
                          <IntlMessage id="logManagement.report.total" />
                        ) : (
                          value
                        )}
                      </Flex>
                    );
                  },
                },
                {
                  key: 'count',
                  title: (
                    <IntlMessage id="logManagement.report.count" />
                  ),
                  dataIndex: 'value',
                  align: 'center',
                  render: (value: number) =>
                    formatNumber(value),
                },
              ]}
            />
            <ReportArchiveSummaryChart
              data={data ?? []}
            />
          </Flex>
        ) : (
          <Flex
            align="center"
            justify="center"
            className="h-100"
            style={{ marginTop: -20 }}
          >
            <Empty />
          </Flex>
        )}
      </Card>
    </FallbackError>
  );
};
