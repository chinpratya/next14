import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import { getColLayout } from '@/utils';

import { ImageSelectorCell } from './image-selector-cell';

type OptionsType = {
  value: string;
  src?: string;
  icon?: ReactNode | JSX.Element;
  title?: string;
  description?: string;
};

export type ImageSelectorProps = {
  value?: string;
  options: OptionsType[];
  onChange?: (value: string) => void;
};

export const ImageSelector = ({
  value,
  onChange,
  options,
}: ImageSelectorProps) => {
  return (
    <>
      <Row gutter={[24, 12]} justify="start">
        {options?.map((option) => (
          <Col
            key={option.value}
            {...getColLayout([24, 24, 10, 10, 10, 10])}
          >
            <ImageSelectorCell
              file={option}
              onClick={onChange}
              value={value}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
