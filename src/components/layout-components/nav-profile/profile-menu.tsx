import {
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Avatar, Menu, Typography } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

import { Flex } from '@/components/share-components/flex';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useAuth } from '@/stores/auth';

type ProfileMenuItem = {
  username: string;
  profileImage: string;
  isPackage: string;
};

const ProfileMenu = ({
  username,
  profileImage,
}: ProfileMenuItem) => {
  const router = useRouter();
  const { access_role, accessModule } = useAuth();
  const isAllowOrg =
    accessModule?.includes(
      '__permission/pdpakit/organization/organization-access-module/read-organization-access-module'
    ) ?? false;
  const onMenuClick: MenuClickEventHandler = ({
    key,
  }) => {
    switch (key) {
      case 'sign-out': {
        localStorage.removeItem('auth');
        router.reload();
        break;
      }
      case 'account-setting': {
        window.open('/settings/profile');
        break;
      }
      case 'organization': {
        window.open(
          '/admin/business-setting/organization-detail'
        );
        break;
      }
      default:
        break;
    }
  };

  const items = [
    {
      key: 'account-setting',
      label: (
        <Typography
          className={css`
            width: 100%;
            padding-left: 10px;
            padding-top: 5px;
            height: 30px;
          `}
        >
          <Flex
            justifyContent={'between'}
            alignItems="center"
            className={css`
              width: 100%;
            `}
          >
            <div>
              <SettingOutlined className="mr-2" />
              <IntlMessage id="accountSetting" />
            </div>
          </Flex>
        </Typography>
      ),
      // icon: <SettingOutlined />,
    },
    {
      key: 'organization',
      label: (
        <Typography
          className={css`
            width: 100%;
            padding-left: 10px;
            padding-top: 3px;
            background: ${!isAllowOrg
              ? 'rgba(217, 217, 217, 0.16)'
              : 'none'};
            height: 30px;
          `}
        >
          <Flex
            justifyContent={'between'}
            alignItems="center"
            className={css`
              width: 100%;
            `}
          >
            <div>
              <ShopOutlined className="mr-2" />
              <IntlMessage id="organization" />
            </div>
            {!isAllowOrg ? (
              <LockOutlined
                className={css`
                  background: #ededed;
                  width: 20px;
                  height: 25px;
                  padding-top: 6px;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  font-size: 10px;
                  top 0;
                  position: absolute;
                  right: 10px;
                `}
              />
            ) : null}
          </Flex>
        </Typography>
      ),
      // icon: <ShopOutlined />,
      disabled: !isAllowOrg,
    },
    {
      key: 'sign-out',
      label: (
        <Typography
          className={css`
            width: 100%;
            padding-top: 5px;
            padding-left: 10px;
            height: 30px;
          `}
        >
          <Flex
            justifyContent={'between'}
            alignItems="center"
            className={css`
              width: 100%;
            `}
          >
            <div>
              <LogoutOutlined className="mr-2" />
              <IntlMessage id="signOut" />
            </div>
          </Flex>
        </Typography>
      ),
      // icon: <LogoutOutlined />,
    },
  ];

  if (access_role === 'portal') {
    return (
      <div className="nav-profile-body">
        <Menu
          items={_.filter(items, { key: 'sign-out' })}
          onClick={({ key }) => {
            if (key === 'sign-out') {
              router.push(
                '/portal/assessment-automation'
              );
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={css`
        .ant-dropdown-menu {
          box-shadow: none;
        }

        .username {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ant-avatar {
          border: 1px solid #e8e8e8;
        }

        .head-size {
          max-width: 150px;
        }
        .ant-dropdown-menu-item,
        .ant-dropdown-menu-submenu-title {
          padding: 0;
        }
      `}
    >
      <div className="nav-profile nav-dropdown">
        <div className="nav-profile-header">
          <div className="d-flex ">
            <Avatar size={50} src={profileImage} />
            <div className="pl-3 head-size">
              <h4 className="mb-0 username">
                {username}
              </h4>
            </div>
          </div>
        </div>
        <div className="nav-profile-body">
          <Menu items={items} onClick={onMenuClick} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
