import { css } from '@emotion/css';
import { Card, Empty } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';
import { ReportExportChart } from '@/features/log-management';

import { Option } from '../../types';
import { ReportBarChart } from '../report-bar-chart';

type ReportEventUsageSummaryChartProps = {
  data: Option[];
  loading?: boolean;
};

export const ReportEventUsageSummaryChart = ({
  data,
  loading,
}: ReportEventUsageSummaryChartProps) => {
  return (
    <Card
      title={
        <IntlMessage id="logManagement.report.summaryReport" />
      }
      loading={loading}
      extra={
        <>
          {data.length > 0 && (
            <ReportExportChart
              data={data}
              columns={[
                { key: 'label', label: 'Date' },
                { key: 'value', label: 'Event Count' },
              ]}
              filename="report_SIEM_event_usage_summary"
            />
          )}
        </>
      }
    >
      {data.length < 1 ? (
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
            isFormatNumber
            axisBottomRotate={40}
            axisLeftLegendOffset={-65}
            marginBottom={73}
            marginLeft={90}
            marginRight={20}
            padding={0.4}
            axisBottomLegend="Date"
            axisLeftLegend="Event Count"
          />
        </div>
      )}
    </Card>
  );
};
