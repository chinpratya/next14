import { css } from '@emotion/css';
import { Dropdown, Avatar } from 'antd';
import { useEffect } from 'react';

import { useAuth } from '@/stores/auth';

import { useGetProfile } from '../../../features/profile/api/getProfile';

import ProfileMenu from './profile-menu';

type UserAttribute = {
  Name: string;
  Value: string;
};

export const NavProfile = () => {
  const { data } = useGetProfile();
  const userInfo = {
    UserAttributes: [],
  } as {
    UserAttributes: UserAttribute[];
  };
  const { email, setUser } = useAuth();

  useEffect(() => {
    if (data && data.email && !email) {
      setUser(data.email);
    }
  }, [data, email, setUser]);

  if (!userInfo?.UserAttributes) return null;

  const username =
    `${data?.first_name} ${data?.last_name}` ??
    'Anonymous';

  const profileImage =
    userInfo.UserAttributes.find(
      (attr: UserAttribute) =>
        attr.Name === 'custom:profile_image'
    )?.Value ?? '/img/user.png';

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      className={css`
        .ant-avatar {
          border: 1px solid #e8e8e8;
        }
      `}
      dropdownRender={() => (
        <ProfileMenu
          username={username}
          profileImage={profileImage}
          isPackage="free"
        />
      )}
      overlayStyle={{ position: 'fixed' }}
    >
      <div className="nav-item">
        <div className="d-flex align-items-center">
          <Avatar size={45} src={profileImage} />
        </div>
      </div>
    </Dropdown>
  );
};
