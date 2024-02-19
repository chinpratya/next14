import { Flex, FlexProps } from '@mantine/core';
import { Typography } from 'antd';
import { ReactNode } from 'react';

type SpParagraphProps = {
  title?: ReactNode;
  children?: ReactNode;
} & FlexProps;

export const SpParagraph = (props: SpParagraphProps) => {
  const { title, direction, children, ...others } = props;
  return (
    <Flex
      gap={5}
      {...others}
      direction={direction || 'column'}
    >
      <Typography.Text style={{ fontWeight: 600 }}>
        {title} :
      </Typography.Text>
      {children}
    </Flex>
  );
};
