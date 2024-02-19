import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import Image from 'next/image';

import { getColLayout } from '@/utils';

export type SelectStyleProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const styleOptions = [
  {
    key: 'style-1',
    src: '/img/consent-management/consent-builder/style-1.png',
  },
  {
    key: 'style-2',
    src: '/img/consent-management/consent-builder/style-2.png',
  },
];

export const SelectStyle = ({
  value,
  onChange,
}: SelectStyleProps) => {
  return (
    <Row gutter={[16, 16]}>
      {styleOptions.map((style) => (
        <Col
          key={style.key}
          {...getColLayout([24, 24, 24, 12, 12, 12])}
        >
          <div
            className={css`
              text-align: center;
              padding: 16px;
              border-radius: 5px;
              cursor: pointer;
              border: ${value === style.key
                ? '1px solid #1890ff'
                : 'none'};

              &:hover {
                background: #f5f5f5;
              }
            `}
            onClick={() => onChange?.(style.key)}
          >
            <Image
              src={style.src}
              alt={style.key}
              width={150}
              height={100}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};
