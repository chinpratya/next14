import { css } from '@emotion/css';
import { Col, Row } from 'antd';
import Image from 'next/image';

import { getColLayout } from '@/utils';

export type PolicyBuilderFormContentSelectStyleProps = {
  value?: string;
  onChange?: (value: string) => void;
  style?: 'stylePolicy' | 'styleText';
  styleValue?: string;
};

const stylePolicyOptions = [
  {
    key: 'style-1',
    src: '/img/policy-management/policy-builder/style-01.png',
  },
  {
    key: 'style-2',
    src: '/img/policy-management/policy-builder/style-02.png',
  },
];

const styleTextOptions = [
  {
    key: 'style-1',
    src: '/img/policy-management/policy-builder/style-text-01.png',
  },
  {
    key: 'style-2',
    src: '/img/policy-management/policy-builder/style-text-02.png',
  },
];

const styleTextOptions2 = [
  {
    key: 'style-1',
    src: '/img/policy-management/policy-builder/style-text-11.png',
  },
  {
    key: 'style-2',
    src: '/img/policy-management/policy-builder/style-text-12.png',
  },
];

export const PolicyBuilderFormContentSelectStyle = ({
  value,
  onChange,
  style,
  styleValue = 'style-1',
}: PolicyBuilderFormContentSelectStyleProps) => {
  const styleOptions =
    style === 'stylePolicy'
      ? stylePolicyOptions
      : styleValue === 'style-1'
      ? styleTextOptions
      : styleTextOptions2;

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
