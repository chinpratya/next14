import { Card, Descriptions } from 'antd';

import { getColLayout } from '@/utils';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

export interface OtherInformationProps {
  createdDate?: string;
  createdBy?: string;
  lastUpdatedDate?: string;
  lastUpdatedBy?: string;
}

export const OtherInformation = ({
  createdDate,
  createdBy,
  lastUpdatedDate,
  lastUpdatedBy,
}: OtherInformationProps) => {
  return (
    <>
      <Card title={<IntlMessage id="otherInfo" />}>
        <Descriptions
          layout="vertical"
          column={getColLayout([1, 2, 4, 4, 4, 4])}
        >
          <Descriptions.Item
            label={<IntlMessage id="createdDt" />}
          >
            <ShowTagDate date={createdDate} />
          </Descriptions.Item>
          <Descriptions.Item
            label={<IntlMessage id="createdBy" />}
          >
            {createdBy || '-'}
          </Descriptions.Item>
          <Descriptions.Item
            label={<IntlMessage id="updatedDt" />}
          >
            <ShowTagDate date={lastUpdatedDate} />
          </Descriptions.Item>
          <Descriptions.Item
            label={<IntlMessage id="updatedBy" />}
          >
            {lastUpdatedBy || '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};
