import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { PieChartSidebar } from '@charts/pie-chart-sidebar';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieReportExpired } from '../../types';

export type DashboardCookiesExpiredProps = {
  data?: CookieReportExpired;
  isLoading: boolean;
};

export const DashboardCookiesExpired = ({
  data,
  isLoading,
}: DashboardCookiesExpiredProps) => {
  const { t } = useTranslation();

  const getDashboardCookiesExpired = (
    data: CookieReportExpired | undefined
  ) => {
    return [
      {
        id: 'moreThan12Months',
        label: t(
          tokens.cookieManagement.scanReport.moreThanYear
        ),
        value: data?.moreyear ?? 0,
        color: '#5C27FF',
      },
      {
        id: 'lessThan12Months',
        label: t(
          tokens.cookieManagement.scanReport.lessThanYear
        ),
        value: data?.lessyear ?? 0,
        color: '#699DFF',
      },
    ];
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
                  .dashboardCookieExpiry
              }
            />
          </Typography.Title>
        }
        data={getDashboardCookiesExpired(data)}
      />
    </Card>
  );
};
