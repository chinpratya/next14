import { css } from '@emotion/css';
import { Radio as AntdRadio } from 'antd';
import type { RadioGroupProps as AntdRadioGroupProps } from 'antd';

export type RadioGroupProps = AntdRadioGroupProps & {
  flexDirection?: 'row' | 'column';
  readOnly?: boolean;
};

export const RadioGroup = ({
  flexDirection = 'column',
  readOnly,
  onChange,
  ...props
}: RadioGroupProps) => {
  return (
    <div
      className={css`
        .ant-radio-group {
          display: flex;
          flex-direction: ${flexDirection};
        }
      `}
    >
      <AntdRadio.Group
        {...props}
        onChange={readOnly ? undefined : onChange}
      />
    </div>
  );
};
