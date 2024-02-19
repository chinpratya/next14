import { Flex } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Button, Select, Skeleton } from 'antd';
import { useState } from 'react';

import { useGetUseDetail, User } from '@/features/admin';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { UserPickerModal } from './user-picker-modal';

export type UserPickerProps = {
  value?: string;
  onChange?: (userId: string) => void;
  readonly?: boolean;
  callbackFn?: (user: User) => void;
  titleModal?: string;
};

export const UserPicker = ({
  value,
  onChange,
  readonly,
  callbackFn,
  titleModal = 'dataMapping.userPicker.title',
}: UserPickerProps) => {
  const [open, toggle] = useToggle();
  const [cachedUser, setCachedUser] =
    useState<User | null>(null);
  const { data, isLoading, isError } = useGetUseDetail(
    value ?? ''
  );

  if (isLoading && !cachedUser)
    return <Skeleton.Input className="w-100" active />;

  const handleChange = (user: User) => {
    onChange?.(user.userId);
    callbackFn?.(user);
    setCachedUser(user);
    toggle();
  };

  const options =
    data || cachedUser
      ? [
          {
            label: `${
              data?.first_name ?? cachedUser?.first_name
            } ${
              data?.last_name ?? cachedUser?.last_name
            }`,
            value: data?.userId ?? cachedUser?.userId,
          },
        ]
      : [];

  return (
    <FallbackError isError={isError}>
      <Flex gap={8}>
        <Select
          value={value}
          className="w-100"
          disabled
          options={options}
        />
        <Button
          hidden={readonly}
          type="primary"
          onClick={() => toggle()}
        >
          <IntlMessage id="dataMapping.userPicker.choose" />
        </Button>
      </Flex>
      <UserPickerModal
        open={open}
        onClose={() => toggle()}
        onFinish={handleChange}
        selectedUserId={value}
        titleModal={titleModal}
      />
    </FallbackError>
  );
};
