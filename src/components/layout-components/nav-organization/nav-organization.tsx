import { RetweetOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Dropdown, Tooltip, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiBuildingOffice2 } from 'react-icons/hi2';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useListOrganizationOfUser } from '@/features/admin';
import { useAuth } from '@/stores/auth';
import { useTheme } from '@/stores/theme';

export const NavOrganization = () => {
  const router = useRouter();
  const { locale } = useTheme();
  const { data } = useListOrganizationOfUser();
  const { organizationName, organizationId, setOrg } =
    useAuth();

  useEffect(() => {
    if (
      data &&
      data?.current_department?.department_name &&
      data?.current_department?.departmentId &&
      !organizationName &&
      !organizationId
    ) {
      setOrg({
        organizationName:
          data.current_department.department_name,
        organizationId:
          data.current_department.departmentId,
      });
    }
  }, [data, organizationName, organizationId, setOrg]);

  const getPreviousPath = (): string => {
    const asPath = router.asPath;
    const splitPath = asPath.split('/');
    if (splitPath.length > 4) {
      splitPath.length = 4;
    }
    return splitPath.join('/');
  };

  const onChange = (departmentId: string) => {
    const currentDepartmentId =
      data?.current_department?.departmentId;
    const orgName = data?.data.find(
      (value) => value.departmentId === departmentId
    );

    setOrg({
      organizationName: orgName?.department_name ?? '',
      organizationId: departmentId ?? '',
    });

    if (departmentId === currentDepartmentId) return;

    const previousPath = getPreviousPath();
    router.push(
      `/auth/switch-organization?departmentId=${departmentId}&previousPath=${previousPath}`
    );
  };

  const organizationLabel = !data?.is_have_department ? (
    <IntlMessage id="profile.selectOrganization" />
  ) : locale === 'en' ? (
    data?.current_department?.department_name_en
  ) : (
    data?.current_department?.department_name
  );

  return (
    <Flex align="center" justify="center">
      <Dropdown
        menu={{
          items: data?.data.map((item) => ({
            key: item.departmentId,
            label: (
              <Flex align="center" gap={8}>
                <HiBuildingOffice2
                  color="#0C1862"
                  size={18}
                />
                <Typography.Text strong={item.is_current}>
                  {locale === 'en'
                    ? item.department_name_en
                    : item.department_name}
                </Typography.Text>
              </Flex>
            ),
          })),
          onClick: ({ key }) => onChange(key),
        }}
        trigger={['click']}
        overlayStyle={{ position: 'fixed' }}
      >
        <Flex
          align="center"
          className="cursor-pointer"
          gap={8}
        >
          <HiBuildingOffice2 color="#0C1862" size={18} />
          <Tooltip title={organizationLabel}>
            <Typography.Text
              style={{
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {organizationLabel}
            </Typography.Text>
          </Tooltip>
          <RetweetOutlined
            className={css`
              font-size: 16px;
              color: #000;
              font-weight: bold;
            `}
          />
        </Flex>
      </Dropdown>
    </Flex>
  );
};
