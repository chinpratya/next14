import {
  CloseCircleTwoTone,
  DownCircleTwoTone,
  UpCircleTwoTone,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useListLogDownload } from '../../api/list-log-download';

import { ExplorerDownloadItem } from './explorer-download-item';

export const ExplorerDownloadList = () => {
  const [open, setOpen] = useState(true);

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useListLogDownload();

  const interval = useInterval(refetch, 2000);

  useEffect(() => {
    if (data && !isRefetching) {
      const isDownloading = data.some((item) =>
        ['RUNNING', 'WAITING'].includes(item.status)
      );

      if (isDownloading) interval.start();
      else interval.stop();
    }

    return () => interval.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefetching]);

  useEffect(() => {
    if (isRefetching && interval.active) interval.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  if (isLoading || isError || data?.length === 0)
    return null;

  return (
    <>
      <div
        className={css`
          position: fixed;
          bottom: 32px;
          right: 25px;
          border-radius: 10px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px
            24px;
          background-color: #fff;
          width: 320px;
          z-index: 1000;
        `}
      >
        <Flex
          align="center"
          justify="space-between"
          gap={8}
          className={css`
            padding: 12px 16px;
            background-color: #f7f9fc;
            border-bottom: 1px solid #e6ebf1;
          `}
        >
          <Flex direction="column">
            <Typography.Text
              strong
              style={{ fontSize: 17 }}
            >
              Download Queue
            </Typography.Text>
            <Typography.Paragraph
              className="mb-0"
              style={{ color: '#72849A' }}
            >
              {
                data?.filter(
                  (item) => item.status === 'RUNNING'
                ).length
              }{' '}
              Queue In Downloading
            </Typography.Paragraph>
          </Flex>
          <Flex
            align="center"
            gap={10}
            className={css`
              span {
                font-size: 24px;
              }
            `}
          >
            {open ? (
              <UpCircleTwoTone
                onClick={() => setOpen((prev) => !prev)}
              />
            ) : (
              <DownCircleTwoTone
                onClick={() => setOpen((prev) => !prev)}
              />
            )}

            <CloseCircleTwoTone />
          </Flex>
        </Flex>

        <div
          className={css`
            overflow: scroll;
            max-height: ${open ? '350px' : 0};
            transition: max-height 0.3s ease;
          `}
        >
          <Flex
            className={css`
              padding: 16px;
            `}
            direction="column"
            gap={16}
          >
            {data?.map((item) => (
              <ExplorerDownloadItem
                key={item.id}
                data={item}
              />
            ))}
          </Flex>
        </div>
      </div>
    </>
  );
};
