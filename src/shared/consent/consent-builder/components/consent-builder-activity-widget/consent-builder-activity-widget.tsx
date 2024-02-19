import { Card } from 'antd';

import { ConsentActivityType } from '@/types';

import { ConsentBuilderPurposeWidget } from '../consent-builder-purpose-widget';

export type ConsentBuilderActivityWidgetProps = {
  activity: ConsentActivityType;
};

export const ConsentBuilderActivityWidget = ({
  activity,
}: ConsentBuilderActivityWidgetProps) => {
  return (
    <Card>
      {activity?.purposes?.map((purpose) => (
        <ConsentBuilderPurposeWidget
          key={purpose.purposeID}
          purpose={purpose}
        />
      ))}
    </Card>
  );
};
