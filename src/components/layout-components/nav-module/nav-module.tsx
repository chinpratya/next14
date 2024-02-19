import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Divider,
  Grid,
  Select,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { MODULE_ICONS } from '@/config/moduleIcon';
import Utils from '@/utils';
import { getModules } from '@/utils/module';
import { permissions } from '@/permissions';
import { useAuth } from '@/stores/auth';
import { LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Option } = Select;
const { useBreakpoint } = Grid;

export const NavModule = () => {
  const { pathname, push } = useRouter();
  const { accessModule } = useAuth();

  const appId = pathname.split('/')?.[2];
  const moduleName = pathname.split('/')?.[3];

  const [path, setPath] = useState('');

  useEffect(() => {
    if (pathname) {
      const path = pathname
        .split('/')
        .slice(0, 4)
        .join('/');
      setPath(path);
    }
  }, [pathname]);

  const isTablet = Utils.getBreakPoint(
    useBreakpoint()
  ).includes('md');
  const currentModules = getModules(appId);

  const onChange = (value: string) => {
    const currentModulesSelect = _.find(
      currentModules,
      (key) => key.path === value
    );

    const permissionValue = currentModulesSelect
      ? _.get(
          permissions,
          (currentModulesSelect.permission as string) ??
            '',
          undefined
        )
      : undefined;
    const isAccess = permissionValue
      ? accessModule?.includes(permissionValue) ?? false
      : false;
    if (isAccess) {
      push(value);
      setPath(value);
    }
  };

  if (
    !appId ||
    !moduleName ||
    !isTablet ||
    currentModules.length <= 1
  ) {
    return null;
  }

  const onGoOurProducts = () => {
    push(`/apps?appId=${appId}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Flex align="center" className="px-4">
      <Select
        value={path}
        style={{ width: 280 }}
        onChange={onChange}
        dropdownStyle={{
          position: 'fixed',
        }}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider className="my-2" />
            <Button
              block
              type="link"
              onClick={onGoOurProducts}
            >
              Our Products
            </Button>
          </>
        )}
      >
        {currentModules.map((item) => {
          const permissionValue = _.get(
            permissions,
            (item.permission as string) ?? '',
            undefined
          );

          const isAccess = permissionValue
            ? accessModule?.includes(permissionValue) ??
              false
            : false;
          return (
            <Option
              key={item.id}
              value={item.path}
              className={css`
                border-bottom: 0.3px solid #ededed !important;
              `}
            >
              <Flex
                justify={'space-between'}
                align="center"
                className={css`
                  gap: 8px;
                  cursor: ${isAccess
                    ? 'pointer'
                    : 'not-allowed'};

                  .lock-icon {
                    position: absolute;
                    font-size: 15px !important;
                    background: rgba(217, 217, 217, 0.24);
                    width: 25px;
                    height: 30px;
                    right: 10px;
                    top: 0;
                    padding-top: 5px;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    color: rgba(
                      162,
                      177,
                      194,
                      1
                    ) !important;
                  }
                  .icon-module {
                    min-width: 28px;
                    width: 28px;
                    height: 23px;
                    color: ${isAccess
                      ? '#3364fe'
                      : 'rgba(62, 121, 255, 0.5)'};
                  }
                `}
              >
                <Flex justify={'start'} align={'center'}>
                  {MODULE_ICONS?.[item.appId]?.[item.id]}
                  <Typography.Text
                    style={{
                      maxWidth: 260,
                      marginLeft: '5px',
                      color: isAccess
                        ? 'unset'
                        : '#C4C4C4',
                    }}
                    ellipsis={true}
                  >
                    {item.title}
                  </Typography.Text>
                </Flex>
                {!isAccess ? (
                  <LockOutlined className="lock-icon" />
                ) : null}
              </Flex>
            </Option>
          );
        })}
      </Select>
    </Flex>
  );
};
