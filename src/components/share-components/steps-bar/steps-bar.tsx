import { css } from '@emotion/css';
import { Card, Steps } from 'antd';
import type { StepsProps } from 'antd/es/steps';

export type StepsBarProps = StepsProps;

export const StepsBar = ({ ...props }: StepsBarProps) => {
  return (
    <Card
      className={css`
        .ant-card-body {
          padding: 36px 24px;
        }
      `}
    >
      <Steps {...props} />
    </Card>
  );
};
