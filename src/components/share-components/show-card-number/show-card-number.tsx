import { Card, Typography } from 'antd';

import { Flex } from '@components/flex';

import { LoadingOverlay } from '../loading-overlay';

export type ShowCardNumberProps = {
  number: number;
  title: string | React.ReactNode;
  annotation?: string | React.ReactNode;
  isLoading?: boolean;
};

export const ShowCardNumber = ({
  number,
  title,
  annotation,
  isLoading = false,
}: ShowCardNumberProps) => {
  return (
    <Card title={title}>
      <LoadingOverlay visible={isLoading} />
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography.Title level={1}>
          {number}
        </Typography.Title>
        {annotation && (
          <Typography.Text>{annotation}</Typography.Text>
        )}
      </Flex>
    </Card>
  );
};
