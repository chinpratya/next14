import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { PieChartSidebar } from '@charts/pie-chart-sidebar';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieDashboardAccept } from '../../types';

export type DashboardAcceptedProps = {
  data?: CookieDashboardAccept;
  isLoading?: boolean;
};

export const DashboardAccepted = ({
  data,
  isLoading,
}: DashboardAcceptedProps) => {
  const { t } = useTranslation();

  const getDashboardAccepted = (
    acceptData: CookieDashboardAccept | undefined
  ) => {
    if (!acceptData) return [];
    return [
      {
        id: 'acceptedAll',
        label: t(
          tokens.cookieManagement.dashboard.chart
            .acceptedAll
        ),
        value: acceptData.acceptAll,
        color: '#FFC542',
      },
      {
        id: 'acceptedSome',
        label: t(
          tokens.cookieManagement.dashboard.chart
            .acceptedSome
        ),
        value: acceptData.customization,
        color: '#699DFF',
      },
    ];
  };

  const chartData = getDashboardAccepted(data);

  return (
    <Card
      title={
        <IntlMessage
          id={
            tokens.cookieManagement.dashboard.chart
              .accepted
          }
        />
      }
      loading={isLoading}
    >
      <PieChartSidebar
        data={chartData}
        innerRadius={0.7}
      />
    </Card>
  );
};
