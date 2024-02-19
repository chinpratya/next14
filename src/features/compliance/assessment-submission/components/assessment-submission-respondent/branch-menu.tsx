import { ClockCircleFilled } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Menu, MenuProps, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { Flex } from '@/components/share-components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationRespondent } from '../../types';

export type BranchMenuProps = {
  orgRespondent?: OrganizationRespondent[];
  onChangeNavigation: (keyPath: string[]) => void;
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const BranchMenu = ({
  orgRespondent,
  onChangeNavigation,
}: BranchMenuProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (orgRespondent) {
      const data = orgRespondent.map((item) =>
        getItem(
          <Flex
            alignItems="center"
            justifyContent="between"
          >
            <Typography.Text
              ellipsis
              className={css`
                max-width: 70%;
              `}
            >
              {item.name}
            </Typography.Text>

            <Tag
              className={css`
                color: #bcbcbc;
                background-color: #fff;
                border-radius: 40px;
              `}
            >{`${item.count}/${item.total}`}</Tag>
          </Flex>,
          item.ObjectUUID,
          null,
          item.branchs.map((branch) =>
            getItem(
              <Flex
                alignItems="center"
                justifyContent="between"
              >
                <Typography.Text
                  ellipsis
                  className={css`
                    max-width: 70%;
                  `}
                >
                  {branch.isOverdue && (
                    <ClockCircleFilled
                      className={css`
                        position: absolute;
                        left: 28px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #ff7226;
                        font-size: 13px !important;
                      `}
                    />
                  )}
                  {branch.name}
                </Typography.Text>

                <Tag
                  className={css`
                    color: #bcbcbc;
                    background-color: #fff;
                    border-radius: 40px;
                  `}
                >{`${branch.count}/${branch.total}`}</Tag>
              </Flex>,
              branch.ObjectUUID
            )
          )
        )
      );

      setItems([
        getItem(
          <Flex
            alignItems="center"
            justifyContent="between"
          >
            <Typography.Text
              ellipsis
              className={css`
                max-width: 70%;
                padding-left: 10px;
              `}
            >
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.all" />
            </Typography.Text>

            <Tag
              className={css`
                border-radius: 40px;
                color: #bcbcbc;
                background-color: #fff;
              `}
            >{`${orgRespondent.reduce(
              (total, { count }) => total + count,
              0
            )}/${orgRespondent.reduce(
              (total, org) => total + org.total,
              0
            )}`}</Tag>
          </Flex>,
          'all',
          null,
          data
        ),
      ]);
    }
  }, [orgRespondent]);

  return (
    <div className="w-100">
      <div className="mobile-nav-menu">
        <Scrollbars autoHide>
          <Menu
            mode="inline"
            rootClassName={css`
              .ant-menu-submenu-title {
                padding-right: 0;
              }
              .ant-menu-sub.ant-menu-inline
                > .ant-menu-submenu
                > .ant-menu-submenu-title {
                padding-right: 0 !important;
                .ant-menu-submenu-arrow {
                  left: 30px !important;
                }
              }
              .ant-menu-sub.ant-menu-inline
                > .ant-menu-item {
                padding-left: 50px !important;
                padding-right: 0 !important;
              }
              .ant-menu-submenu-arrow,
              .ant-menu-submenu-expand-icon {
                left: 17px;
              }
              .ant-menu-item-icon {
                position: absolute;
                right: 0 !important;
              }
            `}
            onClick={({ keyPath }) =>
              onChangeNavigation(keyPath)
            }
            defaultOpenKeys={['all']}
            items={items}
          />
        </Scrollbars>
      </div>
    </div>
  );
};
