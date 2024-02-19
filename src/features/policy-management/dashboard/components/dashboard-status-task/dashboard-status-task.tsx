import { Card, Empty } from 'antd';
import _ from 'lodash';

import { PieChart } from '@/components/chart-components/pie-chart';
import utils from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { PolicyDashboardStatus } from '../../types';

type DashboardStatusTaskProps = {
  data?: PolicyDashboardStatus[];
};

export const DashboardStatusTask = ({
  data,
}: DashboardStatusTaskProps) => {
  const dataPie = _.map(data, (statusTask) => {
    return {
      id: statusTask.label,
      label: statusTask.label,
      value: statusTask.value,
      color: utils.generateRandomColor(statusTask.label),
    };
  });

  return (
    <Card
      title={
        <IntlMessage id="policyManagement.dashboard.taskStatus" />
      }
    >
      {dataPie.length < 1 ? (
        <Empty />
      ) : (
        <PieChart
          data={dataPie}
          showlegends
          innerRadius={0.6}
          padAngle={0.5}
          cornerRadius={0}
          enableArcLinkLabels={false}
          showtextCenter
          textCenter="ข้อมูลทั้งหมด"
        />
      )}
    </Card>
  );
};
