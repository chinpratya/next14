import { Collapse } from 'antd';

import { ActivityCollapsePurposeDescriptions } from './activity-collapse-purpose-descriptions';
import { ActivityCollapsePurposeDetail } from './activity-collapse-purpose-detail';
import { ActivityCollapsePurposeDetailForm } from './activity-collapse-purpose-detail-form';

export const ActivtityCollapsePurpose = () => {
  return (
    <Collapse defaultActiveKey={1}>
      <Collapse.Panel
        header="Purpose ID : 213123"
        key="1"
      >
        <ActivityCollapsePurposeDescriptions />
        <Collapse defaultActiveKey={1}>
          <Collapse.Panel header="ปลายทาง 1" key="1">
            <ActivityCollapsePurposeDetail />
            <ActivityCollapsePurposeDetailForm />
          </Collapse.Panel>
        </Collapse>
      </Collapse.Panel>
    </Collapse>
  );
};
