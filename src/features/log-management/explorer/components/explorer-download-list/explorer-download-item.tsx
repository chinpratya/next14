import { FileZipOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Progress, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';

import { useCancelLogDownload } from '../../api/cancel-log-download';
import { ExplorerDownload } from '../../types';

type ExplorerDownloadItemProps = {
  data: ExplorerDownload;
};

export const ExplorerDownloadItem = ({
  data,
}: ExplorerDownloadItemProps) => {
  const [isCancel, setIsCancel] = useState(false);
  const [prevData, setPrevData] =
    useState<ExplorerDownload>();

  const cancelLogDownload = useCancelLogDownload({});

  const { id, status, name, progress, link } = data;

  const onCancel = (fileId: string) => {
    cancelLogDownload.submit(fileId);
  };

  const handleDownload = () => {
    if (
      prevData &&
      prevData.status !== data.status &&
      data.status === 'SUCCESS'
    ) {
      const url = data.link.split('://')[1];
      window.open(`https://${url}`, '_self');
    } else if (!prevData) {
      setPrevData(data);
    }
  };

  const checkCancel = () => {
    if (data.status === 'CANCEL') {
      setTimeout(() => {
        setIsCancel(true);
      }, 5000);
    }
  };

  useEffect(() => {
    handleDownload();
    checkCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={10}>
          <FileZipOutlined style={{ fontSize: 16 }} />
          {status === 'SUCCESS' ? (
            <Typography.Link
              href={link}
              ellipsis={true}
              style={{ maxWidth: 165 }}
            >
              {name}
            </Typography.Link>
          ) : (
            <Typography.Text
              style={{ maxWidth: 165 }}
              ellipsis={{ tooltip: name }}
            >
              {name}
            </Typography.Text>
          )}
        </Flex>

        {status === 'SUCCESS' ? (
          <Typography.Text type="success">
            <IntlMessage id="logManagement.success" />
          </Typography.Text>
        ) : data.status === 'RUNNING' ? (
          <Typography.Link
            type="danger"
            onClick={() => onCancel(id)}
            disabled={
              cancelLogDownload.isLoading || !isCancel
            }
          >
            <IntlMessage id="logManagement.cancel" />
          </Typography.Link>
        ) : status === 'ERROR' ? (
          <Typography.Text type="danger">
            <IntlMessage id="logManagement.fail" />
          </Typography.Text>
        ) : status === 'CANCEL' ? (
          <Typography.Text type="danger">
            <IntlMessage id="logManagement.canceled" />
          </Typography.Text>
        ) : (
          <Typography.Text type="warning">
            <IntlMessage id="logManagement.wating" />
          </Typography.Text>
        )}
      </Flex>
      <Progress
        percent={
          status === 'WAITING' ? 0 : progress * 100
        }
        showInfo={false}
      />
    </div>
  );
};
