import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { PieChartSidebar } from '@charts/pie-chart-sidebar';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieReportTypePerson } from '../../types';

export type DashboardThirdPartyProps = {
  data?: CookieReportTypePerson;
  isLoading: boolean;
};

export const DashboardThirdParty = ({
  data,
  isLoading,
}: DashboardThirdPartyProps) => {
  const { t } = useTranslation();

  const getDashboardThirdParty = (
    data: CookieReportTypePerson | undefined
  ) => {
    return [
      {
        id: 'firstParty',
        label: t(
          tokens.cookieManagement.scanReport.firstParty
        ),
        value: data?.FirstPerson ?? 0,
        color: '#3364FE',
      },
      {
        id: 'thirdParty',
        label: t(
          tokens.cookieManagement.scanReport.thirdParty
        ),
        value: data?.ThirdPerson ?? 0,
        color: '#FA8C16',
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
                  .dashboardThirdParty
              }
            />
          </Typography.Title>
        }
        data={getDashboardThirdParty(data)}
      />
    </Card>
  );
};
