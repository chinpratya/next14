import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import _ from 'lodash';

import { tokens } from '@/lang';
import { useTheme } from '@/stores/theme';
import { PieChartSidebar } from '@charts/pie-chart-sidebar';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  CookieCategory,
  useGetCookiesAndCategory,
} from '../../../cookies';
import { CookieReportCategory } from '../../types';

export type DashboardCategoryProps = {
  domainId: string;
  data?: CookieReportCategory[];
  isLoading: boolean;
};

const getDashboardCategory = (
  data: CookieReportCategory[] | undefined,
  categories: CookieCategory[] | undefined,
  local: string
) => {
  if (!data || !categories) {
    return [];
  }

  return data.map((item) => {
    const category = categories.find(
      (category) =>
        _.get(
          category.cetegory_label,
          'th',
          category.cetegory_label
        ) === item.categoryName ||
        _.get(
          category.cetegory_label,
          'en',
          category.cetegory_label
        ) === item.categoryName ||
        category.cetegory_name === item.categoryName
    );

    return {
      id: item.categoryName,
      label:
        _.get(category?.cetegory_label, local) ??
        item.categoryName ??
        item.categoryName,
      value: item.count,
      color: category?.background ?? '#000',
    };
  });
};

export const DashboardCategory = ({
  domainId,
  data,
  isLoading,
}: DashboardCategoryProps) => {
  const cookiesAndCategory =
    useGetCookiesAndCategory(domainId);

  const { locale } = useTheme();

  const categories = _.get(
    cookiesAndCategory,
    'data.category',
    []
  );

  return (
    <FallbackError isError={cookiesAndCategory.isError}>
      <Card
        loading={
          isLoading || cookiesAndCategory.isLoading
        }
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
                    .dashboardCategory
                }
              />
            </Typography.Title>
          }
          data={getDashboardCategory(
            data,
            categories,
            locale
          )}
        />
      </Card>
    </FallbackError>
  );
};
