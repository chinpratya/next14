import { Col, Row, Skeleton } from 'antd';

import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListIcon } from '../../api/list-icon';

import { IconSelectorCell } from './icon-selector-cell';
import { IconSelectorUpload } from './icon-selector-upload';

export type IconSelectorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const IconSelector = ({
  value,
  onChange,
}: IconSelectorProps) => {
  const {
    data: icons,
    isLoading,
    isError,
  } = useListIcon();

  if (isLoading) return <Skeleton active />;

  return (
    <FallbackError isError={isError}>
      <Row gutter={[24, 12]} justify="start">
        {icons?.map((icon) => (
          <Col
            key={icon.ObjectUUID}
            {...getColLayout([12, 8, 6, 6, 4, 3])}
          >
            <IconSelectorCell
              fileId={icon.fileID}
              onClick={onChange}
              value={value}
            />
          </Col>
        ))}
        <Col {...getColLayout([12, 8, 6, 6, 4, 3])}>
          <IconSelectorUpload />
        </Col>
      </Row>
    </FallbackError>
  );
};
