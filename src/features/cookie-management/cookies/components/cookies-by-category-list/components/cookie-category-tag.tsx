import { Badge } from 'antd';
import _ from 'lodash';

import { useTheme } from '@/stores/theme';

import { CookieCategory } from '../../../types';

export type CookieCategoryTagProps = {
  category?: CookieCategory;
};

export const CookieCategoryTag = ({
  category,
}: CookieCategoryTagProps) => {
  const { locale } = useTheme();

  if (!category) {
    return null;
  }

  return (
    <Badge
      color={category.background}
      text={_.get(category?.cetegory_label, locale)}
    />
  );
};
