import { Select } from 'antd';

import { useSearch } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListGroup } from '../../api/list-group';

export type GroupSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  menuID?: string;
};

export const GroupSelect = ({
  value,
  onChange,
  menuID = 'Activity',
}: GroupSelectProps) => {
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const { data, isLoading, isError } = useListGroup({
    search: debouncedSearch ?? value,
    menuID: menuID,
  });

  const options = data?.data?.map((item) => ({
    label: item.name,
    value: item.groupID,
  }));

  return (
    <FallbackError isError={isError}>
      <Select
        showSearch
        value={value}
        onChange={onChange}
        loading={isLoading}
        onSearch={onSearch}
        options={options}
        filterOption={false}
        searchValue={search}
      />
    </FallbackError>
  );
};
