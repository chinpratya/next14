import { Descriptions, Typography } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

type DataCategoriesRiskAssessmentInfoProps = {
  assessmentName: string;
  datasubject: string;
  policy: string;
  categoryName: string;
  datasubjectGroup: string[];
};
export const DataCategoriesRiskAssessmentInfo = ({
  assessmentName,
  datasubject,
  policy,
  categoryName,
  datasubjectGroup,
}: DataCategoriesRiskAssessmentInfoProps) => {
  return (
    <div>
      <Descriptions column={3} layout="vertical">
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.name" />
          }
          labelStyle={{ fontWeight: 'bold' }}
        >
          {assessmentName && assessmentName !== ''
            ? assessmentName
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.dataSubject" />
          }
          labelStyle={{ fontWeight: 'bold' }}
        >
          {datasubject && datasubject !== ''
            ? datasubject
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.policy" />
          }
          labelStyle={{ fontWeight: 'bold' }}
        >
          {policy && policy !== '' ? policy : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.categoryName" />
          }
          labelStyle={{ fontWeight: 'bold' }}
        >
          <div style={{ maxWidth: '300px' }}>
            {categoryName && categoryName !== '' ? (
              <Typography.Text ellipsis>
                {categoryName}
              </Typography.Text>
            ) : (
              '-'
            )}
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.datasubjectGroup" />
          }
          labelStyle={{ fontWeight: 'bold' }}
        >
          {datasubjectGroup && datasubjectGroup.length > 0
            ? datasubjectGroup.join(',')
            : '-'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
