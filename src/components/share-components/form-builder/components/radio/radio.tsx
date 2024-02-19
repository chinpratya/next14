import { Radio as AntdRadio } from 'antd';
import type { RadioProps as AntdRadioProps } from 'antd';

export type RadioProps = AntdRadioProps & {
  readOnly?: boolean;
};

export const Radio = ({
  readOnly,
  onChange,
  ...props
}: RadioProps) => {
  return (
    <AntdRadio
      {...props}
      onChange={readOnly ? undefined : onChange}
    />
  );
};
