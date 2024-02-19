import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { ReportExportChart } from '@/features/log-management';
import { convertBytesToSize } from '@/utils';

import { COLORS } from '../../../shared/constant/color';
import { useListIndiceEventSize } from '../../api/list-indice-event-size';
import { ReportFilter } from '../../types';
import { ReportPieTable } from '../report-pie-table';

import { ReportIndiceEventSizeChart } from './report-indice-event-size-chart';

type ReportIndiceEventSizeProps = {
  filter: ReportFilter;
};

export const ReportIndiceEventSize = ({
  filter,
}: ReportIndiceEventSizeProps) => {
  const { data, isLoading, isError } =
    useListIndiceEventSize({
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

  const reportColumns = [
    { key: 'label', label: 'Name Indices' },
    { key: 'value', label: 'Event Usage' },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.reportSummary.top10EventSizeByIndices" />
        }
        loading={isLoading}
        extra={
          data &&
          data.length > 0 && (
            <ReportExportChart
              data={data.map((item) => ({
                ...item,
                value: convertBytesToSize(
                  item.value as number
                ),
              }))}
              defaultData={data}
              columns={reportColumns}
              filename="report_SIEM_event_size_by_indices"
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
                            background-color: ${COLORS[
                              index
                            ]};
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
                    <IntlMessage id="siem.reportSummary.eventUsage" />
                  ),
                  dataIndex: 'value',
                  align: 'center',
                  render: (value: number) =>
                    convertBytesToSize(value),
                },
              ]}
            />
            <ReportIndiceEventSizeChart
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
