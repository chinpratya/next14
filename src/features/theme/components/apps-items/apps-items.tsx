import { Row, Col } from 'antd';

import { AppsConfig } from '@/types/apps';

import { AppItem, AppItemProps } from './app-item';

export type AppsItemsProps = Pick<
  AppItemProps,
  'onClick' | 'current'
> & {
  items: AppsConfig;
};
export const AppsItems = ({
  items,
  current,
  onClick,
}: AppsItemsProps) => {
  return (
    <Row gutter={[24, 24]} className="pt-4">
      {items.map((item) => (
        <Col
          key={item.id}
          xs={24}
          sm={25}
          md={12}
          lg={8}
          xl={7}
          xxl={7}
        >
          <AppItem
            current={current}
            onClick={onClick}
            item={item}
          />
        </Col>
      ))}
    </Row>
  );
};
