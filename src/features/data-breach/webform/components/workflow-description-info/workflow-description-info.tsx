import { Card, Descriptions } from 'antd';

import { tokens } from '@/lang';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { WebFormDetail } from '../../types';

export type WorkflowDescriptionInfoProps = {
  data: WebFormDetail;
};

export const WorkflowDescriptionInfo = ({
  data,
}: WorkflowDescriptionInfoProps) => {
  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.webform.basicInfo}
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
          xl: 3,
          xxl: 3,
        }}
      >
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.createdDt}
            />
          }
        >
          <ShowTagDate date={data?.createdDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.updatedDt}
            />
          }
        >
          <ShowTagDate date={data?.updatedDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.status}
            />
          }
        >
          <ShowTagStatus status={data?.status ?? '-'} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.version}
            />
          }
        >
          {data?.version ?? '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
