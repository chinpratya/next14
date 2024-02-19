import { Row, Col, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { IntlMessage } from '@utilComponents/intl-message';

type SelectedDuration = 'day' | 'week' | 'month' | 'year';

type DashboardOptionsContentProps = {
  onDurationChange: (
    newDuration: SelectedDuration
  ) => void;
  selectedDuration: SelectedDuration;
};

export const DashboardOptionsContentPolicy = ({
  onDurationChange,
  selectedDuration,
}: DashboardOptionsContentProps) => {
  const handleDurationChange = (e: RadioChangeEvent) => {
    const newDuration = e.target.value;
    onDurationChange(newDuration);
  };

  return (
    <Row
      justify={'end'}
      align={'middle'}
      gutter={[10, 10]}
      className="mb-3"
    >
      <Col>
        <Radio.Group
          onChange={handleDurationChange}
          value={selectedDuration}
        >
          <Radio.Button value={'day'}>
            <IntlMessage id="policyManagement.dashboard.day" />
          </Radio.Button>
          <Radio.Button value={'week'}>
            <IntlMessage id="policyManagement.dashboard.week" />
          </Radio.Button>
          <Radio.Button value={'month'}>
            <IntlMessage id="policyManagement.dashboard.month" />
          </Radio.Button>
          <Radio.Button value={'year'}>
            <IntlMessage id="policyManagement.dashboard.year" />
          </Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
};
