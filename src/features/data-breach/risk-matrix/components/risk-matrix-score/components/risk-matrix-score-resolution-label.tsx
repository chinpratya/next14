import { Flex } from '@mantine/core';
import { Typography } from 'antd';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

export type RiskMatrixScoreResolutionLabelProps = {
  resolution?: number;
  scores?: number[];
  minScore?: number;
  maxScore?: number;
  direction?: 'row' | 'column';
};

const getResolutionLabel = (
  resolution: number
):
  | {
      key: string;
      label: string | React.ReactNode;
    }[]
  | null => {
  const labels = [
    {
      key: 'highest',
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.scoreHighest}
        />
      ),
    },
    {
      key: 'height',
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.scoreHeight}
        />
      ),
    },
    {
      key: 'medium',
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.scoreMedium}
        />
      ),
    },
    {
      key: 'low',
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.scoreLow}
        />
      ),
    },
    {
      key: 'lowest',
      label: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.scoreLowest}
        />
      ),
    },
  ];

  switch (resolution) {
    case 3:
      return labels?.filter((label) =>
        ['height', 'medium', 'low'].includes(label.key)
      );
    case 4:
      return labels?.filter((label) =>
        ['highest', 'height', 'medium', 'low'].includes(
          label.key
        )
      );
    case 5:
      return labels;
    default:
      return null;
  }
};

export const RiskMatrixScoreResolutionLabel = ({
  resolution,
  scores,
  minScore,
  maxScore,
  direction = 'row',
}: RiskMatrixScoreResolutionLabelProps) => {
  if (!resolution || !scores) return null;

  const resolutionLabels = getResolutionLabel(resolution);

  return (
    <Flex
      direction={direction}
      align={direction === 'row' ? 'center' : 'start'}
      justify="start"
      gap={direction === 'row' ? 12 : 4}
    >
      {resolutionLabels
        ?.reverse()
        ?.map(({ key, label }, index) => {
          const rangStart =
            scores?.[index - 1] ?? minScore;
          const rangEnd = scores?.[index] ?? maxScore;

          return (
            <Typography.Title
              level={5}
              key={key}
              className="m-0"
              style={{ fontSize: 13 }}
            >
              {label}: {rangStart + 1} - {rangEnd}
            </Typography.Title>
          );
        })
        ?.reverse()}
    </Flex>
  );
};
