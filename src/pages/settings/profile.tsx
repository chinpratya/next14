import { Col, Row, Tabs } from 'antd';
import { ReactNode } from 'react';

import {
  ProfileBasicInfo,
  ProfileUserGroups,
  ProfileRoles,
} from '@/features/profile';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const ProfilePage = () => {
  return (
    <>
      <PageHeader
        title={<IntlMessage id="profile.setting.title" />}
        overlap
      />
      <Row justify="center">
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={18}
          xl={16}
          xxl={14}
        >
          <Tabs
            items={[
              {
                key: 'basic-info',
                label: (
                  <IntlMessage id="profile.setting.basicInfo" />
                ),
                children: <ProfileBasicInfo />,
              },
              {
                key: 'user-groups',
                label: (
                  <IntlMessage id="profile.setting.userGroup.title" />
                ),
                children: <ProfileUserGroups />,
              },
              {
                key: 'roles',
                label: (
                  <IntlMessage id="profile.setting.role.title" />
                ),
                children: <ProfileRoles />,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

ProfilePage.getLayout = (page: ReactNode) => (
  <AppLayout navSideEnable={false}>{page}</AppLayout>
);

export default ProfilePage;
