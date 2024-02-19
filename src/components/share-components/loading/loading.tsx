import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Icon = (
  <LoadingOutlined style={{ fontSize: 35 }} spin />
);

export type LoadingProps = {
  align?: 'center' | 'left' | 'right';
  cover?: 'page' | 'content' | 'inline';
};

export const Loading = ({
  align = 'center',
  cover = 'inline',
}: LoadingProps) => {
  return (
    <div
      className={`loading text-${align} cover-${cover}`}
    >
      <Spin indicator={Icon} />
    </div>
  );
};
