import { Space } from 'antd';
import { get } from 'lodash';

import { SEVERITY_ITEMS } from './severity-constant';

type SlaSeverityIconProps = {
  level?: string;
};
export function SlaSeverityIcon({
  level,
}: SlaSeverityIconProps) {
  const item = get(SEVERITY_ITEMS, `${level}`) ?? {};
  return (
    <Space>
      {item.icon}
      <span>{item.label}</span>
    </Space>
  );
}
