import { css } from '@emotion/css';
import { Card, Empty } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';
import { ReportExportChart } from '@/features/log-management';
import { convertBytesToSize } from '@/utils';

import { Option } from '../../types';
import { ReportBarChart } from '../report-bar-chart';

type ReportSizeUsageSummaryChartProps = {
  data: Option[];
  loading?: boolean;
};

export const ReportSizeUsageSummaryChart = ({
  data,
  loading,
}: ReportSizeUsageSummaryChartProps) => {
  const reportColumns = [
    { key: 'label', label: 'Date' },
    { key: 'value', label: 'Event Usage' },
  ];

  return (
    <Card
      title={
        <IntlMessage id="siem.reportSummary.reportMainPageSummarySizeUsage" />
      }
      loading={loading}
      extra={
        <>
          {data.length > 0 && (
            <ReportExportChart
              data={data.map((item) => ({
                ...item,
                value: convertBytesToSize(
                  item.value as number
                ),
              }))}
              defaultData={data}
              columns={reportColumns}
              filename="report_SIEM_size_usage_summary"
            />
          )}
        </>
      }
    >
      {data?.length < 1 ? (
        <Empty />
      ) : (
        <div
          className={css`
            height: 400px;
          `}
        >
          <ReportBarChart
            data={data ?? []}
            keys={['value']}
            indexBy="label"
            colors={['#3e79f7']}
            axisBottomRotate={40}
            marginBottom={73}
            marginLeft={100}
            marginRight={20}
            padding={0.4}
            axisLeftLegendOffset={-80}
            axisLeftLegend="Event Size"
            axisBottomLegend="Date"
            isSize
          />
        </div>
      )}
    </Card>
  );
};
