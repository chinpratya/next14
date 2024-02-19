import { Row, Col } from 'antd';

import { useListAllAccess } from '@/features/shared';
import { ModulesConfig } from '@/types';
import { Loading } from '@components/loading';

import {
  ModuleItem,
  ModuleItemProps,
} from './module-item';

export type ModulesItemsProps = Pick<
  ModuleItemProps,
  'onClick'
> & {
  items: ModulesConfig;
};

export const ModulesItems = ({
  items,
  onClick,
}: ModulesItemsProps) => {
  const { isLoading } = useListAllAccess();

  if (isLoading) {
    <Loading cover={'content'} />;
  }
  return (
    <Row gutter={[24, 24]}>
      {items.map((item) => (
        <Col
          key={item.id}
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={8}
          xxl={8}
        >
          <ModuleItem item={item} onClick={onClick} />
        </Col>
      ))}
    </Row>
  );
};
