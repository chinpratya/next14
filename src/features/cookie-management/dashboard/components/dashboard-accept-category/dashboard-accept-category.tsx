import { Card } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useTheme } from '@/stores/theme';
import { BarChartDistributed } from '@charts/bar-chart-distributed';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  CookieCategory,
  useGetCookiesAndCategory,
} from '../../../cookies';
import { CookieDashboardCategory } from '../../types';

export type DashboardAcceptCategoryProps = {
  domainId: string;
  data?: CookieDashboardCategory[];
  isLoading?: boolean;
};

const getDashboardAcceptCategory = (
  data: CookieDashboardCategory[] | undefined,
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

export const DashboardAcceptCategory = ({
  domainId,
  data,
  isLoading,
}: DashboardAcceptCategoryProps) => {
  const cookiesAndCategory =
    useGetCookiesAndCategory(domainId);

  const { t } = useTranslation();

  const { locale } = useTheme();

  const categories = _.get(
    cookiesAndCategory,
    'data.category',
    []
  );

  return (
    <FallbackError isError={cookiesAndCategory.isError}>
      <Card
        title={
          <IntlMessage
            id={
              tokens.cookieManagement.dashboard.chart
                .perCategory
            }
          />
        }
        loading={isLoading}
      >
        <BarChartDistributed
          data={getDashboardAcceptCategory(
            data,
            categories,
            locale
          )}
          axisLeft={t(
            tokens.cookieManagement.dashboard.chart
              .totalCookies
          )}
          axisBottom={t(
            tokens.cookieManagement.dashboard.chart
              .cookieCategories
          )}
        />
      </Card>
    </FallbackError>
  );
};
