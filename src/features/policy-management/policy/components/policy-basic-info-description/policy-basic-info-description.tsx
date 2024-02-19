import { Card, Descriptions } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { PolicyDetail } from '../../types';

type PolicyBasicInfoDescriptionProps = {
  data: PolicyDetail;
};

export const PolicyBasicInfoDescription = ({
  data,
}: PolicyBasicInfoDescriptionProps) => {
  return (
    <Card
      title={
        <IntlMessage id="policyManagement.policy.detail" />
      }
    >
      <Descriptions layout="vertical" column={2}>
        <Descriptions.Item
          label={
            <IntlMessage id="policyManagement.policy.version" />
          }
        >
          {data?.version ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="policyManagement.policy.status" />
          }
        >
          <ShowTagStatus status={data?.status ?? '-'} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="policyManagement.policy.createdAt" />
          }
        >
          <ShowTagDate date={data?.created_at} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="policyManagement.policy.updatedAt" />
          }
        >
          <ShowTagDate date={data?.updated_at} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
