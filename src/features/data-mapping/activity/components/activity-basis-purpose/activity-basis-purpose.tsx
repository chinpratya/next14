import { Card, Collapse } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

import { ActivityLawfulBasis } from '../../types';
import { ActivityBasisPurposeDetail } from '../activity-basis-purpose-detail';
import { ActivityBasisPurposeList } from '../activity-basis-purpose-list';

type ActivityBasisPurposeProps = {
  activityId: string;
  selectedBasis: CheckboxValueType[];
  data?: ActivityLawfulBasis;
};

export const ActivityBasisPurpose = ({
  activityId,
  selectedBasis,
  data,
}: ActivityBasisPurposeProps) => {
  const defaultActiveKey = data?.basis.map(
    (basis) => basis.basisID
  );

  return (
    <Card className="mt-4">
      <Collapse defaultActiveKey={defaultActiveKey}>
        {selectedBasis.map((basisID) => {
          const basisData = data?.basis.find(
            (item) => item.basisID === basisID
          );
          return (
            <Collapse.Panel
              header={basisData?.name}
              key={basisID as string}
            >
              <ActivityBasisPurposeList
                activityId={activityId}
                basisId={basisID as string}
              />
              <ActivityBasisPurposeDetail
                activityId={activityId}
                basisId={basisID as string}
              />
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </Card>
  );
};
