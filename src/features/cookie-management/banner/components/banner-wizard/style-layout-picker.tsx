import { css } from '@emotion/css';
import { Col, Row, Image } from 'antd';

import { PRIMARY_COLOR } from '@/config/color';
import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';

export type StyleLayoutPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    scr: string;
  }>;
};

export const StyleLayoutPicker = ({
  value,
  onChange,
  options,
}: StyleLayoutPickerProps) => {
  return (
    <Row
      className={css`
        .ant-col {
          cursor: pointer;

          .border-primary {
            border-radius: 5px;
            border: 1px solid ${PRIMARY_COLOR};
          }

          .image-clicker:hover {
            transform: scale(1.05);
          }

          :not(:last-child) {
            @media (max-width: 1400px) {
              padding-bottom: 20px;
              border-bottom: 1px solid #f0f0f0;
            }
            @media (min-width: 1400px) {
              border-right: 1px solid #f0f0f0;
            }
          }
        }
      `}
    >
      {options?.map((option) => {
        return (
          <Col
            {...getColLayout(8)}
            key={option.value}
            span={8}
            className="mb-3"
          >
            <div onClick={() => onChange?.(option.value)}>
              <Flex
                alignItems="center"
                justifyContent="center"
              >
                <div
                  className={`p-4 image-clicker ${
                    value === option.value
                      ? 'border-primary'
                      : ''
                  }`}
                >
                  <Image
                    width={100}
                    src={option.scr}
                    alt={`layout-${option.value}`}
                    preview={false}
                  />
                </div>
              </Flex>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
