import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { ReportExportChart } from '@/features/log-management';
import { convertBytesToSize } from '@/utils';

import { COLORS } from '../../../shared/constant/color';
import { useListHostEventSize } from '../../api/list-host-event-size';
import { ReportFilter } from '../../types';
import { ReportPieTable } from '../report-pie-table';

import { ReportHostEventSizeChart } from './report-host-event-size-chart';

type ReportHostEventSizeProps = {
  filter: ReportFilter;
};

export const ReportHostEventSize = ({
  filter,
}: ReportHostEventSizeProps) => {
  const { data, isLoading, isError } =
    useListHostEventSize({
      module: 'SIEM',
      type: 'csv',
      report_type: 'hosts',
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
    { key: 'label', label: 'Host' },
    { key: 'value', label: 'Event Usage' },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.reportSummary.top10EventSizeByHost" />
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
              filename="report_SIEM_top_10_event_size_by_host"
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
                    <IntlMessage id="siem.reportSummary.nameHost" />
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
            <ReportHostEventSizeChart data={data ?? []} />
          </Flex>
        ) : (
          <Empty />
        )}
      </Card>
    </FallbackError>
  );
};
