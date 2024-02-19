import { Select, SelectProps } from 'antd';
import _ from 'lodash';

import { prefixCode } from './prefix-code';

export type SelectPhonePrefixProps = SelectProps;

export const SelectPhonePrefix = ({
  ...selectProps
}: SelectPhonePrefixProps) => {
  const options = _.uniqBy(
    prefixCode,
    (item) => item.dial_code
  ).map((item) => ({
    label: item.dial_code,
    value: item.dial_code,
  }));

  return (
    <Select
      {...selectProps}
      options={options}
      showSearch
      filterOption={(input, option) => {
        const label = (option?.label as string) ?? '';
        return label
          .toLowerCase()
          .includes(input.toLowerCase());
      }}
    />
  );
};
