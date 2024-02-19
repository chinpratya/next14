import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { useSearch } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListActivity } from '../../api/list-activity';
import { Activity } from '../../types';

export type ActivitySelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  valueKey?: keyof Activity | 'ObjectUUID';
};

export const ActivitySelect = ({
  value,
  onChange,
  valueKey = 'ObjectUUID',
}: ActivitySelectProps) => {
  const { t } = useTranslation();
  const { search, onSearch } = useSearch();
  const { data, isLoading, isError } = useListActivity({
    search,
  });

  const handleChange = (value: string) =>
    onChange?.(value);

  const options = data?.data?.map(
    (activity: Activity) => ({
      label: activity.name,
      value: activity?.[valueKey] ?? activity.ObjectUUID,
    })
  );

  return (
    <FallbackError isError={isError}>
      <Select
        loading={isLoading}
        options={options}
        showSearch
        onSearch={onSearch}
        value={value}
        onChange={handleChange}
        placeholder={
          t(
            'dataMapping.dataLifecycle.create.activityRequired'
          ) as string
        }
      />
    </FallbackError>
  );
};
