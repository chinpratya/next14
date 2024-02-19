import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

export type AuthWrapperAction = {
  onPrev?: () => void;
};

export type AuthWrapperProps = AuthWrapperAction & {
  title?: string;
  description?: string;
  extra?: ReactNode;
  children: ReactNode;
  help?: boolean;
  src?: string;
  loading?: boolean;
  isError?: boolean;
  width?: number;
  height?: number;
};

export const AuthWrapper = ({
  title,
  description,
  extra,
  children,
  onPrev,
  help,
  src,
  loading,
  width = 150,
  height = 150,
  isError = false,
}: AuthWrapperProps) => {
  return (
    <FallbackError isError={isError}>
      <Card
        title={
          onPrev ? (
            <ArrowLeftOutlined onClick={onPrev} />
          ) : null
        }
        loading={loading}
      >
        <div className="my-2">
          <div className="text-center">
            <Image
              width={width}
              height={height}
              className="img-fluid"
              src={src || `/img/logo-xl.png`}
              alt="portal logo"
            />
            {title && (
              <Typography.Title level={3}>
                {title}
              </Typography.Title>
            )}
            {description && (
              <Typography className="mb-2">
                {description}
              </Typography>
            )}
            {extra}
          </div>
          <Row justify="center">
            <Col
              className="pt-4"
              {...getColLayout([22, 22, 22, 22, 22, 22])}
            >
              {children}
            </Col>
          </Row>
        </div>
        {help && (
          <Typography.Text className="text-center d-block mt-4">
            Need help?{' '}
            <Link href="/help">Contact us</Link>
          </Typography.Text>
        )}
      </Card>
    </FallbackError>
  );
};
