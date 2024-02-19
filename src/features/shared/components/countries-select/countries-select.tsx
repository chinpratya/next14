import { Select } from 'antd';
import { useEffect } from 'react';

import countries from 'src/assets/data/countries.json';

export type CountriesSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  labelKey?:
    | 'alpha2'
    | 'alpha3'
    | 'enName'
    | 'iso3166_2'
    | 'name'
    | 'numeric';
  valueKey?:
    | 'alpha2'
    | 'alpha3'
    | 'enName'
    | 'iso3166_2'
    | 'name'
    | 'numeric';
};

export const CountriesSelect = ({
  value,
  onChange,
  labelKey = 'name',
  valueKey = 'alpha3',
  disabled = false,
}: CountriesSelectProps) => {
  useEffect(() => {
    if (!value) {
      const defaultCountry = countries.find(
        (country) => country.iso3166_2 === 'ISO 3166-2:TH'
      );
      if (defaultCountry) {
        onChange?.(defaultCountry[valueKey ?? 'alpha3']);
      }
    }
  }, [value, onChange, valueKey]);

  return (
    <Select
      value={value}
      onChange={onChange}
      disabled={disabled}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label ?? '').includes(input)
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare(
            (optionB?.label ?? '').toLowerCase()
          )
      }
      options={countries.map((country) => ({
        label: country[labelKey || 'name'],
        value: country[valueKey || 'code'],
      }))}
    />
  );
};
