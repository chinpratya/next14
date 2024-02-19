import { css } from '@emotion/css';
import { Card, Empty } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

import { Option } from '../../types';
import { ReportBarChart } from '../report-bar-chart';
import { ReportExportChart } from '../report-export-chart';

type ReportSummaryChartProps = {
  data: Option[];
  loading?: boolean;
};

export const ReportSummaryChart = ({
  loading,
  data,
}: ReportSummaryChartProps) => {
  const reportColumns = [
    { key: 'label', label: 'Date' },
    { key: 'value', label: 'Total' },
  ];

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
              columns={reportColumns}
              filename="report_LM_summary_event_report"
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
            marginLeft={70}
            padding={0.4}
            isFormatNumber
          />
        </div>
      )}
    </Card>
  );
};
