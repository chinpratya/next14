import { Switch } from 'antd';

type AnalysisSwitchNotifyProps = {
  enabled: boolean;
};

export const AnalysisSwitchNotify = ({
  enabled,
}: AnalysisSwitchNotifyProps) => {
  return (
    <Switch
      defaultChecked={enabled}
      checkedChildren="ON"
      unCheckedChildren="OFF"
    />
  );
};
