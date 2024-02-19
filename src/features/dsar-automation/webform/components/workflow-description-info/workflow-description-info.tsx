import { Card, Descriptions } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { WebFormDetail } from '../../types';

type WorkflowDescriptionInfoProps = {
  data: WebFormDetail;
};

export const WorkflowDescriptionInfo = ({
  data,
}: WorkflowDescriptionInfoProps) => {
  return (
    <Card
      title={
        <IntlMessage id="dsarAutomation.setting.webForm.detail" />
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
            <IntlMessage id="dsarAutomation.setting.webForm.webFormId" />
          }
        >
          {data?.workflowID}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.version" />
          }
        >
          {`V.${data?.version}`}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.status" />
          }
        >
          <ShowTagStatus status={data?.status ?? '-'} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.createdDt" />
          }
        >
          <ShowTagDate date={data?.createdDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.updatedDt" />
          }
        >
          <ShowTagDate date={data?.updatedDt} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
