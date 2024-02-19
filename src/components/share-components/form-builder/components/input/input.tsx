import { Input as AntdInput } from 'antd';
import type { InputProps as AntdInputProps } from 'antd';

export type InputProps = AntdInputProps;
export const Input = (props: InputProps) => {
  return <AntdInput {...props} />;
};
