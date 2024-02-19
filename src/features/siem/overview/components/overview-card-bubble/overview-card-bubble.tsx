import { Card, Row } from 'antd';

import { CirclePacking } from '@/components/chart-components/circle-packing-chart';

interface IData {
  name: string;
  label: string;
  value: number;
  color: string;
  icon?: string;
}
interface OverviewCardBubbleProps {
  title: string;
  showlegends: boolean;
  data: IData[];
}

export const OverviewCardBubble = ({
  title,
  showlegends,
  data,
}: OverviewCardBubbleProps) => {
  const dataBubble = {
    name: title,
    color: 'white',
    children: data,
  };

  return (
    <Card title={title}>
      <Row justify="center" align="middle">
        <CirclePacking
          data={dataBubble}
          showlegends={showlegends}
        />
      </Row>
    </Card>
  );
};
