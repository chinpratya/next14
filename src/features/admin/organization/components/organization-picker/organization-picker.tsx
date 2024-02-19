import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Button, Select, Skeleton } from 'antd';
import { useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetOrganizationManagement } from '../../api/get-organization-management';
import { OrganizationManagement } from '../../types';

import { OrganizationPickerModal } from './organization-picker-modal';

export type OrganizationPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  callbackFn?: (
    organization: OrganizationManagement
  ) => void;
};

export const OrganizationPicker = ({
  value,
  onChange,
  readonly,
  callbackFn,
}: OrganizationPickerProps) => {
  const [open, toggle] = useToggle();
  const [cachedOrganization, setCachedOrganization] =
    useState<OrganizationManagement | null>(null);
  const { data, isLoading, isError } =
    useGetOrganizationManagement({
      organizationId: value ?? '',
    });

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
          <IntlMessage id="admin.organizationPickerModal.choose" />
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
