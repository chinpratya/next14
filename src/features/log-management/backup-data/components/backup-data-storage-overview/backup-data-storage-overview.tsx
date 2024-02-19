import { Flex } from '@mantine/core';
import { Badge, Card, Skeleton, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';

import { BackupDataInfo } from '../../types';

type BackupDataStorageOverviewProps = {
  data?: BackupDataInfo;
  loading: boolean;
};

export const BackupDataStorageOverview = ({
  data,
  loading,
}: BackupDataStorageOverviewProps) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage id="logManagement.backupData.storageOverview" />
      }
      className="mb-0 h-100"
    >
      {loading ? (
        <Skeleton paragraph={{ rows: 2 }} />
      ) : (
        <Flex direction="column" gap={6}>
          <Typography.Text>
            <IntlMessage id="logManagement.backupData.backup" />
          </Typography.Text>
          <Typography.Text>
            <IntlMessage id="logManagement.backupData.config" />{' '}
            :
            <Badge
              className="ml-1"
              count={
                data?.backup.config
                  ? t('logManagement.all')
                  : 0
              }
              showZero
              color="#d6d6d6"
            />
          </Typography.Text>
          <Typography.Text>
            <IntlMessage id="logManagement.backupData.logs" />{' '}
            :
            <Badge
              className="ml-1"
              count={
                data?.backup.logs
                  ? t('logManagement.all')
                  : 0
              }
              color="#d6d6d6"
              showZero
            />
          </Typography.Text>
          <Typography.Text>
            <IntlMessage id="logManagement.backupData.usedSpace" />{' '}
            : -
          </Typography.Text>
        </Flex>
      )}
    </Card>
  );
};
