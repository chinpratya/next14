import { Progress, Typography } from 'antd';

import { Flex } from '@components/flex';

export type ProgressBarWithInfoProps = {
  count: number;
  total: number;
};

export const ProgressBarWithInfo = ({
  count,
  total,
}: ProgressBarWithInfoProps) => {
  const progress = (count / total) * 100;

  return (
    <Flex>
      <Progress percent={progress} showInfo={false} />
      <Typography className="ml-2">
        {count}/{total}
      </Typography>
    </Flex>
  );
};
