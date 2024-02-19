import { Typography } from 'antd';
import React from 'react';

import { Flex } from '@components/flex';
import { NavLanguage } from '@layoutComponents/nav-language';

export type Link = {
  message: string | React.ReactNode;
  text: string | React.ReactNode;
  href: string;
};

export type FormHeaderProps = {
  title: string;
  link: Link;
};
export const FormHeader = ({
  title,
  link,
}: FormHeaderProps) => {
  return (
    <>
      <Flex
        justifyContent="between"
        alignItems="center"
        className="mb-2"
      >
        <Typography.Title level={1} className="mb-0">
          {title}
        </Typography.Title>
        <NavLanguage fontSize={18} hideLanguage />
      </Flex>
      <Typography>
        {link.message}{' '}
        <a href={`${link.href}`}>{link.text}</a>
      </Typography>
    </>
  );
};
