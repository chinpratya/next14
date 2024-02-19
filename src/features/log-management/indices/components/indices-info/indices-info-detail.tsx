import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';

import { IntlMessage } from '@/components/util-components/intl-message';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';

export type IndicesInfoDetailProps = {
  createdAt: string;
  updatedAt: string;
};

export const IndicesInfoDetail = ({
  createdAt,
  updatedAt,
}: IndicesInfoDetailProps) => {
  return (
    <Card
      title={
        <IntlMessage id="logManagement.indices.detail" />
      }
    >
      <Descriptions column={2}>
        <Descriptions.Item
          label={
            <IntlMessage id="logManagement.createdDate" />
          }
        >
          <ShowTagDate date={createdAt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="logManagement.updatedDate" />
          }
        >
          <ShowPassTagDate
            date={
              dayjs(updatedAt).year() < 2000
                ? null
                : updatedAt
            }
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
