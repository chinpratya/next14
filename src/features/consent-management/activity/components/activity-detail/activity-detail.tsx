import { css } from '@emotion/css';
import { Card, Descriptions } from 'antd';

import { Activity } from '@/features/data-mapping';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

type ActivityDetailProps = {
  data?: Activity;
};

export const ActivityDetail = ({
  data,
}: ActivityDetailProps) => {
  return (
    <Card
      title={
        <IntlMessage id="consentManagement.activity.activityDetail.detail.basicInfo" />
      }
    >
      <Descriptions
        layout="vertical"
        className={css`
          .ant-descriptions-item-label {
            font-weight: 500;
          }
        `}
        column={4}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.activity.activityDetail.detail.createDate" />
          }
        >
          <ShowTagDate date={data?.created_dt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.activity.activityDetail.detail.createdBy" />
          }
        >
          {data?.created_by}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.activity.activityDetail.detail.lastUpdatedDate" />
          }
        >
          <ShowTagDate date={data?.updated_dt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.activity.activityDetail.detail.lastUpdatedBy" />
          }
        >
          {data?.updated_by}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
