import {
  Divider,
  Form,
  FormInstance,
  Grid,
  Typography,
} from 'antd';
import React from 'react';

import { UploadAvatar } from '@/features/shared';
import utils from '@/utils';
import { Flex } from '@components/flex';

const { useBreakpoint } = Grid;

export type BrandHeroProps = {
  logoName?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactElement;
  form?: FormInstance;
  disabled?: boolean;
};
export const BrandHero = ({
  logoName = 'logo',
  title,
  description,
  children,
  form,
  disabled = false,
}: BrandHeroProps) => {
  const isMobile = utils
    .getBreakPoint(useBreakpoint())
    .includes('xs');

  return (
    <Flex
      alignItems="center"
      flexDirection={isMobile ? 'column' : 'row'}
      className="mb-4"
    >
      <div
        style={{
          width: 350,
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <Form form={form}>
          <Form.Item name={logoName} noStyle>
            <UploadAvatar disabled={disabled} />
          </Form.Item>
        </Form>
      </div>
      <div className="w-100">
        <Divider orientation="left" orientationMargin={0}>
          <Typography.Title level={4}>
            {title}
          </Typography.Title>
        </Divider>
        <Typography.Text>{description}</Typography.Text>
        {children}
      </div>
    </Flex>
  );
};
