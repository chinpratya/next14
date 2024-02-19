import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Card } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  usePermission,
  useRowSelection,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { InnerAppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteCategory } from '../../api/delete-category';
import { CookieCategory, CookieItem } from '../../types';
import { CookiesCategoryCreateModal } from '../cookies-category-create-modal';
import { CookiesCategoryEditModal } from '../cookies-category-edit-modal';

import { CookiesCategoryList } from './components/cookies-category-list';
import {
  CookiesList,
  CookiesListProps,
} from './components/cookies-list';

export type CookiesByCategoryListProps = Pick<
  CookiesListProps,
  'onEdit'
> & {
  domainId: string;
  cookies: CookieItem[];
  categories: CookieCategory[];
};

export const CookiesByCategoryList = ({
  domainId,
  cookies,
  categories,
  onEdit,
}: CookiesByCategoryListProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('all');
  const { showNotification } = useNotifications();
  const { rowSelection } = useRowSelection({});

  const { t } = useTranslation();

  const createPermission = usePermission({
    moduleName: 'cookie',
    policies: [
      permissions['pdpakit:cookie:cookie:create'],
    ],
  });

  const toggleCategory = useToggle<CookieCategory>();

  const onCreateCategory = () => {
    toggleCategory.create();
  };

  const onEditCategory = (category: CookieCategory) => {
    toggleCategory.edit(category);
  };

  const onDeleteCategory = (category: CookieCategory) => {
    toggleCategory.remove(category);
  };

  const onCategoryChange = (category: string) => {
    rowSelection.onSelectNone?.();
    setSelectedCategory(category);
  };

  const deleteCategory = useDeleteCategory({
    domainId,
    onSuccess: () => {
      toggleCategory.remove();
      setSelectedCategory('all');
      showNotification({
        type: 'success',
        message: t(
          tokens.cookieManagement.notification
            .deleteCookieCategorySuccess
        ),
      });
    },
  });

  const getFilteredCookiesByCategory = (
    selectedCategory: string
  ) => {
    if (selectedCategory === 'all') {
      return cookies;
    }

    return cookies.filter(
      (cookie) => cookie.category === selectedCategory
    );
  };

  return (
    <>
      <Card
        className={css`
          .ant-card-body {
            padding: 0;

            .ant-menu-inline {
              border-right: 0;
            }

            .ant-menu-item {
              padding: 0 8px 0 16px !important;

              .ant-typography {
                width: 180px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .cookie-category-ellipsis {
                display: none;
              }
            }

            .ant-menu-item-selected {
              .ant-typography {
                color: #3e79f7;
              }

              .cookie-category-badge {
                display: none;
              }

              .cookie-category-ellipsis {
                display: block;
              }
            }
          }
        `}
      >
        <InnerAppLayout
          sideContentWidth={365}
          sideContent={
            <div className="w-100 pt-2 border-right">
              <CookiesCategoryList
                categories={categories}
                cookies={cookies}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
                onDeleteCategory={onDeleteCategory}
                onEditCategory={onEditCategory}
              />
              <Button
                type="link"
                icon={<PlusOutlined />}
                className="text-gray mt-2"
                onClick={onCreateCategory}
                disabled={!createPermission.isAllow}
              >
                {' '}
                <IntlMessage id={tokens.common.add} />
              </Button>
            </div>
          }
          mainContent={
            <div className="w-100">
              <CookiesList
                domainId={domainId}
                cookies={getFilteredCookiesByCategory(
                  selectedCategory
                )}
                categories={categories}
                rowSelection={rowSelection}
                onEdit={onEdit}
              />
            </div>
          }
        />
      </Card>
      <CookiesCategoryCreateModal
        domainId={domainId}
        open={toggleCategory.openCreate}
        onClose={() => toggleCategory.create()}
      />
      <CookiesCategoryEditModal
        domainId={domainId}
        open={toggleCategory.openEdit}
        onClose={() => toggleCategory.edit()}
        category={toggleCategory.data}
      />
      <DeleteModal
        title={
          <IntlMessage
            id={
              tokens.cookieManagement.cookies
                .deleteCategoryModalTitle
            }
          />
        }
        content={
          <IntlMessage
            id={
              tokens.cookieManagement.cookies
                .deleteCategoryModalContent
            }
          />
        }
        hasIdentifier={false}
        open={toggleCategory.openRemove}
        onCancel={() => toggleCategory.remove()}
        width={600}
        onOk={() =>
          deleteCategory.submit(
            toggleCategory?.data?.cetegory_name
          )
        }
        okButtonProps={{
          loading: deleteCategory.isLoading,
        }}
      />
    </>
  );
};
