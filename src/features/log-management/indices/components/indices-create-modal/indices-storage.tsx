import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Typography } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

type IndicesStorageProps = {
  total: number;
  totalUnit?: string;
  used: number;
  usedUnit?: string;
  free: number;
  freeUnit?: string;
  storageInvalid?: boolean;
};

export const IndicesStorage = ({
  free,
  total,
  used,
  freeUnit = 'GB',
  totalUnit = 'GB',
  usedUnit = 'GB',
  storageInvalid,
}: IndicesStorageProps) => {
  const freeValue =
    freeUnit === 'TB'
      ? free * 1024
      : freeUnit === 'GB'
      ? free
      : free / 1024;

  const usedPercent = {
    TB: ((used * 1024) / freeValue) * 1000,
    GB: (used / freeValue) * 100,
    MB: ((used / freeValue) * 100) / 1024,
  } as Record<string, number>;

  return (
    <Flex direction="column">
      <Typography.Text
        strong
        className={css`
          font-size: 12px;
        `}
      >
        <IntlMessage id="logManagement.indices.total" />{' '}
        {`${total ?? 0} ${totalUnit ?? 'GB'}`}
      </Typography.Text>
      <div
        className={css`
          width: 100%;
          height: 29px;
          background-color: #ededed;
          border-radius: 10px;
          overflow: hidden;
        `}
      >
        <span
          className={css`
            height: 100%;
            width: ${usedPercent[usedUnit]}%;
            background-color: ${storageInvalid
              ? 'unset'
              : '#896bfb'};
            display: block;
          `}
        />
      </div>
      <Flex
        justify="space-between"
        className={css`
          margin-top: 2px;
          font-size: 10px;
          color: #72849a;
        `}
      >
        <Typography.Text>
          {`${used ?? 0} ${usedUnit ?? 'GB'}`}{' '}
          <IntlMessage id="logManagement.indices.storage.used" />
        </Typography.Text>
        <Typography.Text>
          {`${free ?? 0} ${freeUnit ?? 'GB'}`}
        </Typography.Text>
      </Flex>
    </Flex>
  );
};
