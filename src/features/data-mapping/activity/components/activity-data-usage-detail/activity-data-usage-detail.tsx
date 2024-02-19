import { Collapse } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { ActivityDataUsagePeopleList } from '../activity-data-usage-people-list';
import { ActivityDataUsagePurposeList } from '../activity-data-usage-purpose-list';

type ActivityDataUsageDetailProps = {
  activityId: string;
};
export const ActivityDataUsageDetail = ({
  activityId,
}: ActivityDataUsageDetailProps) => {
  return (
    <Collapse defaultActiveKey={1}>
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.useAndPublic.usage.detail" />
        }
        key="1"
      >
        <ActivityDataUsagePurposeList
          activityId={activityId}
        />
        <ActivityDataUsagePeopleList
          activityId={activityId}
        />
      </Collapse.Panel>
    </Collapse>
  );
};
