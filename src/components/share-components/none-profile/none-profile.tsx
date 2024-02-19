import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';

import utils from '@/utils';

export type NoneProfileProps = {
  title?: string;
  color?: string;
};

export const NoneProfile = ({
  title,
  color,
}: NoneProfileProps) => {
  const icon = title ? (
    title.split('')[0]?.toUpperCase()
  ) : (
    <UserOutlined />
  );

  return (
    <Tooltip placement="top" title={title}>
      <Avatar
        style={{
          backgroundColor:
            color ?? utils.generateRandomColor(title),
        }}
        icon={icon}
      />
    </Tooltip>
  );
};
