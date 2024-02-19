import {
  FileDoneOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Descriptions } from 'antd';

import { DescriptionIcon } from '@components/description-icon';

import { RequestDetail } from '../../types';

type RequestDetailDetailProps = {
  data?: RequestDetail;
};

export const RequestDetailDetail = ({
  data,
}: RequestDetailDetailProps) => {
  return (
    <Card>
      <Descriptions column={3}>
        <Descriptions.Item>
          <DescriptionIcon
            label="ประเภทเหตุการณ์"
            data={data?.typeOfRequest}
            icon={<FileDoneOutlined />}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <DescriptionIcon
            label="ประเภทเรื่อง"
            data={data?.webfromName}
            icon={<FileTextOutlined />}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <DescriptionIcon
            label="ผู้อนุมัติ"
            data={data?.approved}
            icon={<UserOutlined />}
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
