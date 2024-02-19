import { useSetState } from '@mantine/hooks';
import { Card } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { InnerAppLayout } from '@/layouts';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetRolePermissionBase } from '../../api/get-role-permission-base';

import { RolePermissionPlatformSelect } from './role-permission-platform-select';
import { RolePermissionSelect } from './role-permission-select';

export type RolePermissionProps = {
  permissionIds?: string[];
  onChange?: (permissionIds: string[]) => void;
  isLoading?: boolean;
  isError?: boolean;
};
export const RolePermission = ({
  permissionIds = [],
  onChange,
  ...rest
}: RolePermissionProps) => {
  const { data, isLoading, isError } =
    useGetRolePermissionBase();

  const [state, setState] = useSetState<{
    selectedPlatform: string;
  }>({
    selectedPlatform: '',
  });

  const handleSelectPlatform = (
    selectedPlatform: string
  ) => {
    setState({ selectedPlatform });
  };

  const handleSelectPermission = (
    permissionKey: string
  ) => {
    const newPermissionIds = _.xor(permissionIds, [
      permissionKey,
    ]);
    onChange?.(newPermissionIds);
  };

  useEffect(() => {
    if (data && !state.selectedPlatform) {
      setState({
        selectedPlatform: _.get(
          data,
          '[0].children.[0].name',
          ''
        ),
      });
    }
  }, [data, setState, state.selectedPlatform]);

  console.log(rest);

  return (
    <FallbackError
      isError={isError || rest.isError === true}
    >
      <Card
        loading={isLoading || rest.isLoading}
        title={
          <IntlMessage id="admin.businessSetting.role.permission" />
        }
      >
        <InnerAppLayout
          sideContentWidth={250}
          sideContent={
            <RolePermissionPlatformSelect
              selectedPlatform={state.selectedPlatform}
              rolePermissionApps={data}
              onSelect={handleSelectPlatform}
            />
          }
          mainContent={
            <RolePermissionSelect
              selectedPlatform={state.selectedPlatform}
              rolePermissionApps={data}
              selectedPermissions={permissionIds}
              onChange={handleSelectPermission}
            />
          }
        />
      </Card>
    </FallbackError>
  );
};
