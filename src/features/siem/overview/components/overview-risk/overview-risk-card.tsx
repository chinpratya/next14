import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

import { Flex } from '@/components/share-components/flex';
import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { IntlMessage } from '@/components/util-components/intl-message';

type OverviewRiskCardProps = {
  value: number;
  label: string;
  background: string;
  isLoading?: boolean;
};

export const OverviewRiskCard = ({
  background,
  label,
  value,
  isLoading = false,
}: OverviewRiskCardProps) => {
  return (
    <Card
      className={css`
        background: ${background} !important;
        .ant-typography {
          color: #ffffff;
        }
      `}
    >
      <LoadingOverlay visible={isLoading} />
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography.Title level={1}>
          {value}
        </Typography.Title>
        <Typography.Text>
          <IntlMessage id={label} />
        </Typography.Text>
      </Flex>
    </Card>
  );
};
