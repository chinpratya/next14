import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

import { Flex } from '@components/flex';

export type ShowCardRiskProps = {
  number: number;
  annotation?: string;
  background?: string;
};

export const ShowCardRiskCount = ({
  number,
  annotation,
  background,
}: ShowCardRiskProps) => {
  return (
    <Card
      className={css`
        background: ${background};
        .ant-typography {
          color: white;
        }
      `}
    >
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
