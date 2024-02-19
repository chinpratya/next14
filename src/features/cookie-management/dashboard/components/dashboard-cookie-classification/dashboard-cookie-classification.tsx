import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { PieChartSidebar } from '@charts/pie-chart-sidebar';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieReportClassified } from '../../types';

export type DashboardCookieClassificationProps = {
  data?: CookieReportClassified;
  isLoading: boolean;
};

export const DashboardCookieClassification = ({
  data,
  isLoading,
}: DashboardCookieClassificationProps) => {
  const { t } = useTranslation();
  const getDashboardCookieClassification = (
    data: CookieReportClassified | undefined
  ) => {
    return [
      {
        id: 'classified',
        label: t(
          tokens.cookieManagement.scanReport.classified
        ),
        value: data?.classified ?? 0,
        color: '#496E2D',
      },
      {
        id: 'unclassified',
        label: t(
          tokens.cookieManagement.scanReport.unclassified
        ),
        value: data?.unclassified ?? 0,
        color: '#FF858A',
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
                  .dashboardCookieClassification
              }
            />
          </Typography.Title>
        }
        data={getDashboardCookieClassification(data)}
      />
    </Card>
  );
};
