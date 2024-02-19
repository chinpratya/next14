import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

import { tokens } from '@/lang';
import utils from '@/utils';
import { PieChartSidebar } from '@charts/pie-chart-sidebar';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieReportTechnology } from '../../types';

export type DashboardUserTrackingTechnologyProps = {
  data?: CookieReportTechnology[];
  isLoading: boolean;
};

export const DashboardUserTrackingTechnology = ({
  data,
  isLoading,
}: DashboardUserTrackingTechnologyProps) => {
  const getDashboardCookieClassification = (
    data: CookieReportTechnology[] | undefined
  ) => {
    return data?.map((value: CookieReportTechnology) => {
      return {
        id: value.name,
        label: value.name,
        value: value?.count ?? 0,
        color: utils.useRandomColor(),
      };
    });
  };

  return (
    <Card
      loading={isLoading}
      className={css`
        .ant-card-body {
          padding: 0 24px;
        }
      `}
    >
      <PieChartSidebar
        title={
          <Typography.Title
            level={4}
            className="mt-4 font-weight-bold"
          >
            <IntlMessage
              id={
                tokens.cookieManagement.scanReport
                  .dashboardUserTracking
              }
            />
          </Typography.Title>
        }
        data={getDashboardCookieClassification(data)}
      />
    </Card>
  );
};
