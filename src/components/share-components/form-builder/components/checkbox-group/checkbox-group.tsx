import { css } from '@emotion/css';
import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/es/checkbox';

export type CheckboxGroupProps =
  AntdCheckboxGroupProps & {
    readOnly?: boolean;
  };

export const CheckboxGroup = ({
  readOnly,
  onChange,
  ...props
}: CheckboxGroupProps) => {
  return (
    <div
      className={css`
        .ant-checkbox-group {
          display: flex;
          flex-direction: column;
        }
      `}
    >
      <AntdCheckbox.Group
        {...props}
        onChange={readOnly ? undefined : onChange}
      />
    </div>
  );
};
