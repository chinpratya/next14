import { Flex } from '@mantine/core';
import { Card, Skeleton, Typography } from 'antd';

import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';

import { BackupDataInfo } from '../../types';

type BackupDataInformationProps = {
  data?: BackupDataInfo;
  loading: boolean;
};

export const BackupDataInformation = ({
  data,
  loading,
}: BackupDataInformationProps) => {
  return (
    <Card
      title={
        <IntlMessage id="logManagement.backupData.information" />
      }
      className="mb-0"
    >
      {loading ? (
        <Skeleton paragraph={{ rows: 2 }} />
      ) : (
        <Flex direction="column" gap={6}>
          <Typography.Text>
            <IntlMessage id="logManagement.name" /> :{' '}
            {data?.name}
          </Typography.Text>
          <Typography.Text>
            <IntlMessage id="logManagement.dashboard.status" />{' '}
            :{' '}
            <ShowTagStatus
              status={data?.enabled.toString() ?? ''}
              items={[
                {
                  label: 'logManagement.active',
                  key: 'true',
                  color: '#04D182',
                },
                {
                  label: 'logManagement.inactive',
                  key: 'false',
                  color: '#FF4B4B',
                },
              ]}
            />
          </Typography.Text>
          <Typography.Text>
            <IntlMessage id="logManagement.backupData.backupProvider" />{' '}
            : {data?.provider.type}
          </Typography.Text>
          <Typography.Text>
            <IntlMessage id="logManagement.report.scheduler.title" />{' '}
            :{' '}
            {
              <IntlMessage
                id={`logManagement.backupData.${data?.scheduler.type.toLowerCase()}`}
              />
            }
          </Typography.Text>
        </Flex>
      )}
    </Card>
  );
};
