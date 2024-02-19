import { Card, Descriptions } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { ResultAssessment } from '../../types/assessment';

export type AssessmentInfoCardProps = {
  assessment?: ResultAssessment;
};

export const AssessmentInfoCard = ({
  assessment,
}: AssessmentInfoCardProps) => {
  if (!assessment) return null;
  return (
    <div id="assessmentHeader">
      <Card>
        <Descriptions
          layout="vertical"
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item
            label={
              <IntlMessage id="compliancePortal.result.name" />
            }
          >
            {assessment.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <IntlMessage id="compliancePortal.result.assessmentName" />
            }
          >
            {assessment.assessmentName}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};
