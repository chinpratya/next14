import { css } from '@emotion/css';
import { Button } from 'antd';
import NextLink from 'next/link';
import { ReactNode } from 'react';

export type LinkProps = {
  href: string;
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
};
export const Link = ({
  href,
  children,
  icon,
  className = 'p-0',
}: LinkProps) => {
  return (
    <NextLink
      className={css`
        .ant-btn-link {
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            font-size: 1.5em;
            margin-right: 4px;
          }
        }
      `}
      href={href}
    >
      <Button
        className={className}
        type="link"
        icon={icon}
      >
        {children}
      </Button>
    </NextLink>
  );
};
