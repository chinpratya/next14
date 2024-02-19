import { css } from '@emotion/css';
import { Card, Divider, Typography } from 'antd';
import Image from 'next/image';
import { ReactNode } from 'react';

import { IntlMessage } from '@utilComponents/intl-message';

type OptionsType = {
  value: string;
  src?: string;
  icon?: ReactNode | JSX.Element;
  title?: string;
  description?: string;
};

export type ImageSelectorCellProps = {
  file: OptionsType;
  value?: string;
  onClick?: (icon: string) => void;
  selectText?: 'bottom' | 'top';
};

export const ImageSelectorCell = ({
  file,
  value,
  onClick,
  selectText = 'top',
}: ImageSelectorCellProps) => {
  const isSelected = value === file.value;
  const color = isSelected ? '#61d45b' : '#479dec';

  return (
    <div
      onClick={() => onClick?.(file.value ?? '')}
      className={css`
        display: table;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        border: 3px solid ${color};
        border-radius: 10px;
        width: 100%;
        height: 150px;
        :hover {
          cursor: pointer;
        }
        .image-content {
          display: table-row-group;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          width: 100%;
          height: 75px;
        }
        .icon-selector-top {
          width: 100%;
          background-color: ${color};
          display: ${selectText === 'top'
            ? 'table-header-group'
            : 'table-footer-group'};
        }
      `}
    >
      <div className="icon-selector-top">
        <Typography.Text className="text-white">
          {isSelected ? (
            <IntlMessage id="using" />
          ) : (
            <IntlMessage id="choose" />
          )}
        </Typography.Text>
      </div>
      <div />
      <div className="image-content">
        {file.icon ? (
          <Card cover={file.icon} bordered={false}>
            <Divider className="mb-4" />
            <Card.Meta
              title={file.title}
              description={file.description}
            />
          </Card>
        ) : (
          <Image
            src={
              file.src ??
              'https://via.placeholder.com/150?text=No+Image'
            }
            alt=""
            width={190}
            height={30}
            className="mx-auto my-auto"
          />
        )}
      </div>
    </div>
  );
};
