import { Card, Empty } from 'antd';
import _ from 'lodash';

import { PieChart } from '@/components/chart-components/pie-chart';
import utils from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetDsarDashboardTask } from '../../api/get-dsar-dashboard-task';

export type DashboardDsarTaskProps = {
  duration?: string;
};

export const DashboardDsarTask = ({
  duration,
}: DashboardDsarTaskProps) => {
  const { data, isLoading, isError } =
    useGetDsarDashboardTask({
      duration,
    });

  const dataPie = _.map(data, (v) => {
    return {
      id: v?.name,
      label: v?.name,
      value: v?.value,
      color: utils.useRandomColor(),
    };
  });

  return (
    <Card title="งาน" loading={isLoading}>
      <FallbackError isError={isError}>
        {data && data.length > 0 ? (
          <PieChart
            data={dataPie}
            showlegends
            innerRadius={0.6}
            padAngle={0.5}
            cornerRadius={0}
            enableArcLinkLabels={false}
            showtextCenter
            textCenter="ข้อมูลทั้งหมด"
            colors={dataPie.map((pie) => pie.color)}
          />
        ) : (
          <Empty />
        )}
      </FallbackError>
    </Card>
  );
};
