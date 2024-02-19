import {
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import { Card, Descriptions, Typography } from 'antd';
import Link from 'next/link';

import { Flex } from '@components/flex';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { Receipt } from '../../types';

export type ReceiptCardInfoProps = {
  receipt?: Receipt;
};

export const ReceiptCardInfo = ({
  receipt,
}: ReceiptCardInfoProps) => {
  const [isShowMore, toggleShowMore] = useToggle();

  return (
    <Card>
      <Flex alignItems="center" className="mb-3">
        <Typography.Title level={4} className="mb-0">
          <IntlMessage id="consentManagement.receipts.detail.basicInfo" />
        </Typography.Title>
        {isShowMore ? (
          <Typography.Link
            className="ml-1"
            onClick={() => toggleShowMore()}
          >
            <IntlMessage id="consentManagement.receipts.detail.hideMoreInfo" />
            <EyeInvisibleOutlined className="ml-1" />
          </Typography.Link>
        ) : (
          <Typography.Link
            className="ml-1"
            onClick={() => toggleShowMore()}
          >
            <IntlMessage id="consentManagement.receipts.detail.showMoreInfo" />
            <EyeOutlined className="ml-1" />
          </Typography.Link>
        )}
      </Flex>
      <Descriptions
        column={4}
        layout="vertical"
        labelStyle={{
          fontWeight: 'bold',
        }}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.receipts.dataSubjectId" />
          }
        >
          {receipt?.type}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.receipts.owner" />
          }
        >
          {receipt?.identify}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.receipts.collectionPoint" />
          }
        >
          {receipt?.collectionPoint}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.receipts.activity" />
          }
        >
          {receipt?.activity}
        </Descriptions.Item>
        {isShowMore && (
          <>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.activityGroup" />
              }
            >
              {receipt?.activityGroup}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.collectionMethod" />
              }
            >
              {receipt?.CollectionMethod}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.policyName" />
              }
            >
              <Link
                href={`${receipt?.policyLink}`}
                target="_blank"
              >
                {receipt?.policyName ?? '-'}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.version" />
              }
            >
              {receipt?.policyVersion ?? '-'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.timestamp" />
              }
            >
              <ShowTagDate date={receipt?.timestamp} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.createdBy" />
              }
            >
              {receipt?.createdBy ?? '-'}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.updatedDt" />
              }
            >
              <ShowTagDate date={receipt?.updatedDt} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="consentManagement.receipts.updatedBy" />
              }
            >
              {receipt?.updatedBy ?? '-'}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </Card>
  );
};
