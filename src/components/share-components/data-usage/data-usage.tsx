import { css } from '@emotion/css';
import { Progress, Typography } from 'antd';
import { FaDatabase } from 'react-icons/fa';

import { IntlMessage } from '@/components/util-components/intl-message';
import { PRIMARY_COLOR } from '@/config/color';

export type DataUsageProps = {
  total: number;
  used: number;
  unit?: string;
  totalUnit?: string;
  color?: string;
  fixPercent?: number;
};

export const DataUsage = ({
  total,
  used,
  unit = 'Bytes',
  totalUnit = 'GB',
  color = PRIMARY_COLOR,
  fixPercent,
}: DataUsageProps) => {
  const percent = total === 0 ? 0 : (used / total) * 100;

  const value = fixPercent ?? percent;

  const strokeColor =
    value >= 80
      ? '#DE4437'
      : value >= 66
      ? '#FA8C16'
      : '#3E79F7';

  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        font-size: 10px;

        .ant-progress-bg {
          height: 15px !important;
        }
      `}
      style={{ width: 200 }}
    >
      <FaDatabase size={28} style={{ fill: color }} />
      <div className="pl-2">
        <Progress
          percent={fixPercent ?? percent}
          showInfo={false}
          strokeColor={strokeColor}
        />
        <Typography.Text
          className={css`
            min-width: 133px;
            display: block;
            text-align: left;
          `}
        >
          <IntlMessage id="logManagement.indices.storage.used" />{' '}
          {used} {unit}{' '}
          <IntlMessage id="logManagement.indices.storage.from" />{' '}
          {total} {totalUnit}
        </Typography.Text>
      </div>
    </div>
  );
};
