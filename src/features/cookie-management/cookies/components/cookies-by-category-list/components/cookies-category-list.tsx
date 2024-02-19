import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Dropdown,
  Menu,
  Tooltip,
  Typography,
} from 'antd';
import _ from 'lodash';

import { usePermission } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useTheme } from '@/stores/theme';
import { Flex } from '@components/flex';
import { DocumentBoxIconOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  CookieCategory,
  CookieItem,
} from '../../../types';

const CategoryBadge = ({
  count,
  isCategory = true,
}: {
  count: number;
  isCategory?: boolean;
}) => (
  <Badge
    className={`mr-2 ${
      isCategory ? 'cookie-category-badge' : ''
    }`}
    count={count}
    style={{
      backgroundColor: '#fff',
      color: '#999',
      boxShadow: '0 0 0 1px #d9d9d9 inset',
    }}
  />
);

const CategoryEllipsis = ({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const deletePermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:cookie:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:cookie:update'],
    ],
  });
  return (
    <Dropdown
      placement="bottomRight"
      className="mr-2 cookie-category-ellipsis"
      menu={{
        items: [
          {
            key: 'edit',
            label: (
              <IntlMessage id={tokens.common.edit} />
            ),
            icon: <EditOutlined />,
            onClick: onEdit,
            disabled: !editPermission.isAllow,
          },
          {
            key: 'delete',
            label: (
              <IntlMessage id={tokens.common.delete} />
            ),
            icon: <DeleteOutlined />,
            onClick: onDelete,
            disabled: !deletePermission.isAllow,
          },
        ],
      }}
    >
      <MoreOutlined />
    </Dropdown>
  );
};

export type CookiesCategoryListProps = {
  cookies: CookieItem[];
  categories: CookieCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onDeleteCategory?: (category: CookieCategory) => void;
  onEditCategory?: (category: CookieCategory) => void;
};

export const CookiesCategoryList = ({
  categories,
  cookies,
  selectedCategory,
  onCategoryChange,
  onDeleteCategory,
  onEditCategory,
}: CookiesCategoryListProps) => {
  const { locale } = useTheme();
  const getCookieCount = (category: string) => {
    if (category === 'all') return cookies.length;

    return cookies.filter(
      (cookie) => cookie.category === category
    ).length;
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedCategory]}
      onClick={({ key }) => onCategoryChange(key)}
      items={[
        {
          icon: <DocumentBoxIconOutlined />,
          key: 'all',
          label: (
            <Flex
              alignItems="center"
              justifyContent="between"
            >
              <Typography.Text>
                <IntlMessage
                  id={
                    tokens.cookieManagement.cookies
                      .cookies
                  }
                />
              </Typography.Text>
              <CategoryBadge
                isCategory={false}
                count={getCookieCount('all')}
              />
            </Flex>
          ),
        },
        ...categories.map((category) => ({
          icon: <Badge color={category?.background} />,
          key: category.cetegory_name,
          label: (
            <Flex
              alignItems="center"
              justifyContent="between"
            >
              <div>
                <Typography.Text>
                  {_.get(
                    category?.cetegory_label,
                    locale
                  )}
                </Typography.Text>
                <Tooltip
                  title={_.get(
                    category?.description,
                    locale,
                    ''
                  )}
                >
                  <QuestionCircleOutlined className="ml-1 font-size-sm" />
                </Tooltip>
              </div>
              <div>
                <CategoryBadge
                  count={getCookieCount(
                    category.cetegory_name
                  )}
                />
                <CategoryEllipsis
                  onEdit={() =>
                    onEditCategory?.(category)
                  }
                  onDelete={() =>
                    onDeleteCategory?.(category)
                  }
                />
              </div>
            </Flex>
          ),
        })),
      ]}
    />
  );
};
