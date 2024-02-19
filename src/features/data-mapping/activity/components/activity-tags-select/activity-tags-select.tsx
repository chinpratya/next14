import { Select } from 'antd';

import { useSearch } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListTags } from '../../../tags';

export type ActivityTagsSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const ActivityTagsSelect = ({
  value,
  onChange,
}: ActivityTagsSelectProps) => {
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const { data, isLoading, isError } = useListTags({
    search: debouncedSearch,
  });
  const options = data?.data.map((value) => {
    return { value: value.tagID, label: value.name };
  });
  return (
    <FallbackError isError={isError}>
      <Select
        mode="tags"
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
