import { Descriptions, Tag } from 'antd';

import {
  ERROR_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import { tokens } from '@/lang';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { TransactionDetail } from '../../types';

type TransactionCardInfoProps = {
  data?: TransactionDetail;
};

export const TransactionCardInfo = ({
  data,
}: TransactionCardInfoProps) => {
  return (
    <Descriptions
      column={4}
      layout="vertical"
      labelStyle={{
        fontWeight: 'bold',
      }}
    >
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.receiptId" />
        }
      >
        {data?.receiptID}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.source" />
        }
      >
        {data?.source}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.activity" />
        }
      >
        {data?.activityName}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.activityGroup" />
        }
      >
        {data?.activityGroup}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.status" />
        }
      >
        <ShowTagStatus
          status={data?.status}
          items={[
            {
              label: tokens.common.status.acceptConsent,
              key: 'accept',
              color: SUCCESS_COLOR,
            },
            {
              label: tokens.common.status.rejectConsent,
              key: 'reject',
              color: ERROR_COLOR,
            },
          ]}
        />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.dataSubjectIdentifier" />
        }
      >
        {data?.subjectIdentifierID}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.dataSubjectType" />
        }
      >
        {data?.dataSubject}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.dataSubject" />
        }
      >
        {data?.identify}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.interactionType" />
        }
      >
        {data?.interactionType}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.savedDt" />
        }
      >
        <ShowTagDate date={data?.cratedDt} />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.transactionsId" />
        }
      >
        {data?.transactionsID}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.version" />
        }
      >
        <Tag color="processing">
          {data?.version && `V. ${data?.version}`}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.type" />
        }
      >
        {data?.consentType}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.policyName" />
        }
      >
        {data?.policyName}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.policyVersion" />
        }
      >
        {data?.version}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="consentManagement.transaction.detail.doubleOptIn" />
        }
      >
        <Tag>
          {data?.optIn ? (
            <IntlMessage id="consentManagement.transaction.detail.doubleOptIn.true" />
          ) : (
            <IntlMessage id="consentManagement.transaction.detail.doubleOptIn.false" />
          )}
        </Tag>
      </Descriptions.Item>
    </Descriptions>
  );
};
