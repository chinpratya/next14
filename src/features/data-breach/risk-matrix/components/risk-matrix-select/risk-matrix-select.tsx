import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { useEffect, useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';

import { useListRiskMatrix } from '../../api/list-risk-matrix';

export type RiskMatrixSelectProps = SelectProps;

export const RiskMatrixSelect = ({
  value,
  ...props
}: RiskMatrixSelectProps) => {
  const { data, isLoading, isError } = useListRiskMatrix(
    {}
  );

  const [options, setOptions] = useState<
    SelectProps['options'] | null
  >(null);

  useEffect(() => {
    if (data && !options) {
      const option = data?.data?.map((riskMatrix) => ({
        value: riskMatrix.ObjectUUID,
        label: riskMatrix.name,
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
    const option = newOptions?.map((riskMatrix) => ({
      value: riskMatrix.ObjectUUID,
      label: riskMatrix.name,
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
