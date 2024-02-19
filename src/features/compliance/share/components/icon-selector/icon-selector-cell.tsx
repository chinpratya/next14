import { css } from '@emotion/css';
import { Typography } from 'antd';
import Image from 'next/image';

import { useListFile } from '@/features/shared';

export type IconSelectorCellProps = {
  fileId: string;
  value?: string;
  onClick?: (icon: string) => void;
};

export const IconSelectorCell = ({
  fileId,
  value,
  onClick,
}: IconSelectorCellProps) => {
  const { data: files } = useListFile({
    module: 'assessment-automation',
    group: 'maturity-model',
  });

  const icon = files?.find((file) => file.key === fileId);

  const isSelected = value === icon?.url;
  const color = isSelected ? '#61d45b' : '#479dec';

  return (
    <div
      onClick={() => onClick?.(icon?.url ?? '')}
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        border: 3px solid ${color};
        border-radius: 10px;
        width: 110px;
        height: 110px;

        :hover {
          cursor: pointer;
        }

        .icon-selector-footer {
          width: 100%;
          background-color: ${color};
        }
      `}
    >
      <div />
      <Image
        src={
          icon?.url ??
          'https://via.placeholder.com/150?text=No+Image'
        }
        alt=""
        width={25}
        height={25}
      />
      <div className="icon-selector-footer">
        <Typography.Text className="text-white">
          {isSelected ? 'ใช้งาน' : 'เลือก'}
        </Typography.Text>
      </div>
    </div>
  );
};
