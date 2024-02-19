import { IdcardOutlined } from '@ant-design/icons';
import {
  Avatar as AntdAvatar,
  AvatarProps as AntdAvatarProps,
} from 'antd';

export type AvatarProps = AntdAvatarProps & {
  src?: string;
  size?: number;
};
export const Avatar = ({
  src,
  size = 48,
}: AvatarProps) => {
  if (!src) {
    return (
      <AntdAvatar
        size={size}
        icon={<IdcardOutlined className="text-dark" />}
      />
    );
  }

  return <AntdAvatar size={size} src={src} />;
};
