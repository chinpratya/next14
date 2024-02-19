import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import Link from 'next/link';
import { ReactNode } from 'react';

export type LoginWrapperProps = {
  onPrev?: () => void;
  children: ReactNode;
};
export const LoginWrapper = ({
  onPrev,
  children,
}: LoginWrapperProps) => {
  return (
    <>
      {onPrev && (
        <div className="mb-4">
          <Typography.Text
            className="text-center text-white cursor-pointer"
            type="secondary"
            onClick={onPrev}
          >
            <ArrowLeftOutlined /> Back
          </Typography.Text>
        </div>
      )}
      <Card>
        <div className="mb-4">
          <Typography.Title level={3} className="mb-0">
            Login
          </Typography.Title>
          <Typography.Text type="secondary">
            {"Don't have an account?"}{' '}
            <Link href={'/register'}>Register</Link>
          </Typography.Text>
        </div>
        {children}
      </Card>
    </>
  );
};
