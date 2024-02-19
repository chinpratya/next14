import { Input } from 'antd';
import type { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';

export type TextAreaProps = AntdTextAreaProps;

export const Textarea = (props: TextAreaProps) => {
  return <Input.TextArea {...props} />;
};
