import { Switch as AntdSwitch } from 'antd';
import type { SwitchProps as AntdSwitchProps } from 'antd';

export type SwitchProps = AntdSwitchProps & {
  readOnly?: boolean;
};

export const Switch = ({
  readOnly,
  onChange,
  ...props
}: SwitchProps) => {
  return (
    <AntdSwitch
      {...props}
      disabled={readOnly}
      onChange={readOnly ? undefined : onChange}
    />
  );
};
