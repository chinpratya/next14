import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Button, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import {
  OrganizationManagement,
  useGetOrganizationManagement,
  useListOrganizationOfUser,
} from '@/features/admin';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationPickerModal } from './organization-picker-modal';

export type OrganizationPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  isAutoSelect?: boolean;
  readonly?: boolean;
  callbackFn?: (
    organization: OrganizationManagement
  ) => void;
};

export const OrganizationPicker = ({
  value,
  onChange,
  isAutoSelect,
  readonly,
  callbackFn,
}: OrganizationPickerProps) => {
  const user = useListOrganizationOfUser();

  const [open, toggle] = useToggle();
  const [cachedOrganization, setCachedOrganization] =
    useState<OrganizationManagement | null>(null);
  const { data, isLoading, isError } =
    useGetOrganizationManagement({
      organizationId: value ?? '',
    });

  useEffect(() => {
    if (isAutoSelect && !value && user.data) {
      onChange?.(
        user?.data?.current_department
          ?.departmentId as string
      );
    }
  }, [isAutoSelect, user, value, data, onChange]);

  if (isLoading && !cachedOrganization) {
    return <Skeleton.Input className="w-100" active />;
  }

  const options =
    data || cachedOrganization
      ? [
          {
            label:
              data?.department_name ??
              cachedOrganization?.department_name,
            value:
              data?.departmentId ??
              cachedOrganization?.departmentId,
          },
        ]
      : [];

  const handleChange = (
    organization: OrganizationManagement
  ) => {
    setCachedOrganization(organization);
    onChange?.(organization.departmentId);
    callbackFn?.(organization);
    toggle();
  };

  return (
    <FallbackError isError={isError}>
      <Flex gap={8}>
        <Select
          value={value}
          options={options}
          disabled
        />
        <Button
          hidden={readonly}
          type="primary"
          onClick={() => toggle()}
        >
          <IntlMessage id="dataMapping.organizationPicker.choose" />
        </Button>
      </Flex>
      <OrganizationPickerModal
        open={open}
        onClose={toggle}
        onFinish={handleChange}
        selectedOrganizationId={value}
      />
    </FallbackError>
  );
};
