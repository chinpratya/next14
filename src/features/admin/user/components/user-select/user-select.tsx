import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { useEffect, useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';

import { useListUser } from '../../api/list-user';

export type UserSelectProps = SelectProps;

export const UserSelect = ({
  value,
  ...props
}: UserSelectProps) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useListUser({
    search: value,
  });

  const [options, setOptions] = useState<
    SelectProps['options'] | null
  >(null);

  useEffect(() => {
    if (users && !options) {
      const option = users?.data.map((user) => ({
        value: user.userId,
        label: user.email,
      }));
      setOptions(option);
    }
  }, [users, options]);

  const onSearch = (text: string) => {
    const newOptions = users?.data
      ? users?.data?.filter((v) =>
          v.email
            .toLocaleLowerCase()
            .toLowerCase()
            .includes(text)
        )
      : [];
    const option = newOptions.map((user) => ({
      value: user.userId,
      label: user.email,
    }));
    setOptions([...option]);
  };

  return (
    <FallbackError isError={isError}>
      <Select
        {...props}
        value={value}
        options={options ?? []}
        showSearch
        filterOption={() => true}
        onSearch={(e) => onSearch(e)}
        loading={isLoading}
      />
    </FallbackError>
  );
};
