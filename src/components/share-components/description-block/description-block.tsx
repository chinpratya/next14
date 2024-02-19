import { Divider, Grid, Typography } from 'antd';
import { ReactNode } from 'react';

import utils from '@/utils';
import { Flex } from '@components/flex';

export type DescriptionBlockProps = {
  title: string | ReactNode;
  description?: string | ReactNode;
  value?: string | ReactNode;
  extra?: ReactNode | boolean;
  className?: string;
  bottomClassName?: string;
  extraClassName?: string;
  divider?: boolean;
};

const { useBreakpoint } = Grid;

export const DescriptionBlock = ({
  title,
  description,
  value,
  extra,
  className,
  bottomClassName,
  extraClassName,
  divider = true,
}: DescriptionBlockProps) => {
  const isMobile = utils
    .getBreakPoint(useBreakpoint())
    .includes('xs');

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="between"
        className={className}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <div
          className={`d-flex align-content-center ${
            extra ? 'w-75' : 'w-100'
          }`}
        >
          <div className={value ? 'w-50' : 'w-100'}>
            <Typography.Title
              level={4}
              className={description ? 'mb-1' : 'mb-0'}
            >
              {title}
            </Typography.Title>
            {description}
          </div>
          {value && <div className="w-50">{value}</div>}
        </div>
        {extra && (
          <div
            className={`${
              extraClassName
                ? extraClassName
                : 'w-25 text-right'
            }`}
          >
            {extra}
          </div>
        )}
      </Flex>
      {divider ? (
        <Divider className="mb-3 mt-3" />
      ) : (
        <div
          className={`${
            bottomClassName
              ? bottomClassName
              : 'mb-3 mt-3'
          } `}
        />
      )}
    </>
  );
};
