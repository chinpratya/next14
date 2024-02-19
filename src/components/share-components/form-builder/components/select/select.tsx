import { Select as AntdSelect } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';

export type SelectProps = AntdSelectProps & {
  readOnly?: boolean;
};

export const Select = ({
  options,
  readOnly,
  onChange,
  ...props
}: SelectProps) => {
  return (
    <AntdSelect
      className="w-100"
      {...props}
      options={options?.map(
        (option: string | DefaultOptionType) => {
          if (typeof option === 'string') {
            return {
              label: option,
              value: option,
            };
          }
          return option;
        }
      )}
      onChange={readOnly ? undefined : onChange}
    />
  );
};
