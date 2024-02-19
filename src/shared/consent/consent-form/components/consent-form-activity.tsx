import { Card, FormInstance } from 'antd';

import { ConsentActivityType } from '@/types';

import { ConsentBuilderPurpose } from './consent-form-purpose';

export type ConsentFormActivityProps = {
  activity: ConsentActivityType;
  form?: FormInstance;
};

export const ConsentFormActivity = ({
  activity,
  form,
}: ConsentFormActivityProps) => {
  return (
    <Card>
      {activity?.purposes?.map((purpose) => (
        <ConsentBuilderPurpose
          key={purpose.purposeID}
          purpose={purpose}
          form={form}
          name={activity.activityID}
        />
      ))}
    </Card>
  );
};
