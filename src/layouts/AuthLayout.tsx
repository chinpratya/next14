import { Col, Row, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { ErrorBoundary } from 'react-error-boundary';

import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';
import { Seo } from '@utilComponents/seo';

export type AuthLayoutProps = {
  backgroundURL?: string;
  children: React.ReactNode;
};
export const AuthLayout = ({
  backgroundURL = '/img/bg-auth.png',
  children,
}: AuthLayoutProps) => {
  const { status } = useThemeSwitcher();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  if (status !== 'loaded') {
    return <Loading cover="page" />;
  }

  return (
    <>
      <Seo />
      <div className="auth-container">
        <div className="h-100" style={backgroundStyle}>
          <div className="container d-flex flex-column justify-content-between h-100">
            <div id="logo" className="p-4">
              <Image
                src="/img/logo-xl-dark.png"
                alt="logo"
                width={100}
                height={40}
              />
            </div>
            <Row justify="center">
              <Col
                {...getColLayout([24, 21, 16, 12, 8, 8])}
              >
                <ErrorBoundary
                  fallback={<FallbackError />}
                >
                  {children}
                </ErrorBoundary>
              </Col>
            </Row>
            <div className="text-center p-4">
              <Typography.Text className="text-white">
                Comprehensive security and privacy
                management solution.
              </Typography.Text>
              <div className="mt-2"></div>
              <Typography.Text className="text-white">
                <Link
                  className="text-white"
                  href={'/terms'}
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  Terms of use
                </Link>
                {' | '}
                <Link
                  className="text-white"
                  href={'/privacy'}
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  Privacy Policy
                </Link>
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
