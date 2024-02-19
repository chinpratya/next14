import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { useEffect, useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';

import { useListWorkflow } from '../../api/list-workflow';

export type WorkflowSelectProps = SelectProps;

export const WorkflowSelect = ({
  value,
  ...props
}: WorkflowSelectProps) => {
  const { data, isLoading, isError } = useListWorkflow(
    {}
  );
  const [options, setOptions] = useState<
    SelectProps['options'] | null
  >(null);

  useEffect(() => {
    if (data && !options) {
      const option = data?.data?.map((workflow) => ({
        value: workflow.workflowID,
        label: workflow.name,
      }));
      setOptions(option);
    }
  }, [data, options]);

  const onSearch = (text: string) => {
    const newOptions = data?.data
      ? data?.data?.filter((v) =>
          v.name
            .toLocaleLowerCase()
            .toLowerCase()
            .includes(text)
        )
      : [];
    const option = newOptions?.map((workflow) => ({
      value: workflow.workflowID,
      label: workflow.name,
    }));
    setOptions([...option]);
  };

  return (
    <FallbackError isError={isError}>
      <Select
        {...props}
        options={options ?? []}
        value={value}
        loading={isLoading}
        showSearch
        filterOption={() => true}
        onSearch={onSearch}
      />
    </FallbackError>
  );
};
