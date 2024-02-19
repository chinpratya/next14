import { InputNumber as AntdInputNumber } from 'antd';
import type { InputNumberProps as AntdInputNumberProps } from 'antd';

export type InputNumberProps = AntdInputNumberProps & {
  formatter?: string;
};

export const InputNumber = ({
  formatter,
  ...props
}: InputNumberProps) => {
  return (
    <AntdInputNumber
      {...props}
      formatter={(value) => `${value}${formatter ?? ''}`}
      parser={(value) =>
        value!.replace(formatter ?? '', '')
      }
    />
  );
};
