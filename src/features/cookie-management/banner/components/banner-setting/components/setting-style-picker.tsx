import { css } from '@emotion/css';
import { Col, Image, Row } from 'antd';

import {
  BORDER_PRIMARY_COLOR,
  PRIMARY_COLOR,
} from '@/config/color';
import { getColLayout } from '@/utils';

export type SettingStylePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: {
    value: string;
    scr: string;
  }[];
};

export const SettingStylePicker = ({
  value,
  onChange,
  options,
}: SettingStylePickerProps) => {
  return (
    <>
      <Row
        gutter={[24, 24]}
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

            :first-child {
              border-right: 1px solid
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
        {options.map((option) => (
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
                width={130}
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
    </>
  );
};
