import { TagOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Badge, Dropdown } from 'antd';
import _ from 'lodash';
import { ReactNode } from 'react';

import { useTheme } from '@/stores/theme';

import { CookieCategory } from '../../../types';

export type DropdownCategoryTageProps = {
  categories: CookieCategory[];
  onChange?: (categoryId: string) => void;
  disabled?: boolean;
};

const dropdownRender = (menu: ReactNode) => (
  <div className="pt-3">{menu}</div>
);

export const DropdownCategoryTage = ({
  categories,
  onChange,
  disabled = false,
}: DropdownCategoryTageProps) => {
  const { locale } = useTheme();

  return (
    <Dropdown
      menu={{
        items: categories.map((category) => ({
          key: category.cetegory_name,
          label: _.get(category.cetegory_label, locale),
          icon: <Badge color={category.background} />,
        })),
        onClick: ({ key }) => {
          onChange?.(key);
        },
      }}
      dropdownRender={dropdownRender}
      disabled={disabled}
      className={css`
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
      `}
    >
      <TagOutlined className="mr-2 font-size-lg font-weight-bold" />
    </Dropdown>
  );
};
