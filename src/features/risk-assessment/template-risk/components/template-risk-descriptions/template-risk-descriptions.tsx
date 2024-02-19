import { Card, Descriptions } from 'antd';

import { tokens } from '@/lang';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { TemplateRiskDetail } from '../../types';

export type TemplateRiskDescriptionsProps = {
  data?: TemplateRiskDetail;
};

export const TemplateRiskDescriptions = ({
  data,
}: TemplateRiskDescriptionsProps) => {
  return (
    <Card
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate.basicInfo
          }
        />
      }
    >
      <Descriptions
        layout="vertical"
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 4,
          xxl: 4,
        }}
      >
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate
                  .createdDt
              }
            />
          }
        >
          <ShowTagDate date={data?.createdDt ?? ''} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate
                  .updatedDt
              }
            />
          }
        >
          <ShowTagDate date={data?.updatedDt ?? ''} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.riskAssessment.riskTemplate.type}
            />
          }
        >
          {data?.type_label ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={
                tokens.riskAssessment.riskTemplate.status
              }
            />
          }
        >
          <ShowTagStatus status={data?.status} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
