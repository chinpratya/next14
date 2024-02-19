import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxProps as AntdCheckboxProps } from 'antd';

export type CheckboxProps = AntdCheckboxProps & {
  readOnly?: boolean;
};

export const Checkbox = ({
  readOnly,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <AntdCheckbox
      {...props}
      onChange={readOnly ? undefined : onChange}
    />
  );
};
