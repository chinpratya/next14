import { css } from '@emotion/css';
import { Col, Image, Row } from 'antd';

import {
  BORDER_PRIMARY_COLOR,
  PRIMARY_COLOR,
} from '@/config/color';
import { getColLayout } from '@/utils';

const POSITION_OPTIONS = [
  {
    value: 'bottom-left',
    scr: '/img/cookie-management/banner/icon-1-bottom-left.jpg',
  },
  {
    value: 'bottom-right',
    scr: '/img/cookie-management/banner/icon-1-bottom-right.jpg',
  },
  {
    value: 'top-left',
    scr: '/img/cookie-management/banner/icon-1-top-left.jpg',
  },
  {
    value: 'top-right',
    scr: '/img/cookie-management/banner/icon-1-top-right.jpg',
  },
];

export type SettingCookiesPositionPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const SettingCookiesPositionPicker = ({
  value,
  onChange,
}: SettingCookiesPositionPickerProps) => {
  return (
    <Row
      gutter={[24, 0]}
      className={css`
        .ant-col {
          display: flex;
          justify-content: center;
          padding: 12px;

          .image-wrapper {
            padding: 12px;
          }

          .image-wrapper-active {
            border: 1px solid ${PRIMARY_COLOR};
            border-radius: 4px;
          }

          :nth-child(1),
          :nth-child(3) {
            border-right: 1px solid
              ${BORDER_PRIMARY_COLOR};
          }

          :nth-child(1),
          :nth-child(2) {
            border-bottom: 1px solid
              ${BORDER_PRIMARY_COLOR};
          }
        }

        img {
          transition: all 0.3s;
          text-align: center;

          :hover {
            cursor: pointer;
          }
        }
      `}
    >
      {POSITION_OPTIONS.map((option) => (
        <Col key={option.value} {...getColLayout(12)}>
          <div
            className={`image-wrapper ${
              value === option.value
                ? 'image-wrapper-active'
                : ''
            }`}
          >
            <Image
              src={option.scr}
              width={100}
              onClick={() => {
                onChange?.(option.value);
              }}
              alt={option.value}
              preview={false}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};
