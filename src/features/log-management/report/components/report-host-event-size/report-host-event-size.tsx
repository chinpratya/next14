import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Empty } from 'antd';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { constant } from '@/features/siem';
import { convertBytesToSize } from '@/utils';

import { useListHostEventSize } from '../../api/list-host-event-size';
import { ReportFilter } from '../../types';
import { ReportExportChart } from '../report-export-chart';
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
      module: 'LM',
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
          <IntlMessage id="logManagement.report.sizeByHost" />
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
              filename="report_LM_size_by_host"
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
                    <IntlMessage id="logManagement.report.nameHost" />
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
                    <IntlMessage id="logManagement.report.eventUsage" />
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
