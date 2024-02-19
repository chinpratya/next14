import {
  EyeOutlined,
  FileSyncOutlined,
  FileUnknownOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Descriptions,
  Divider,
  Tag,
  Typography,
} from 'antd';

import { useToggle } from '@/hooks';
import { CommentBox } from '@components/comment-box';
import { DescriptionIcon } from '@components/description-icon';
import { Flex } from '@components/flex';

import { TaskDetail } from '../../types';
import { TaskDetailRequestDetailDrawer } from '../task-detail-request-detail-drawer';

export type TaskDetailRequestDetailProps = {
  data?: TaskDetail;
  taskId: string;
};

export const TaskDetailRequestDetail = ({
  data,
  taskId,
}: TaskDetailRequestDetailProps) => {
  const toggle = useToggle();

  return (
    <>
      <Flex alignItems="center" className="mb-3">
        <Typography.Title level={3} className="mb-0">
          Pawan Nakwitra
        </Typography.Title>
        <Typography.Link
          className="ml-1"
          onClick={toggle.preview}
        >
          ดูรายละเอียดเพิ่มเติม <EyeOutlined />
        </Typography.Link>
      </Flex>
      <Descriptions column={2}>
        <Descriptions.Item>
          <DescriptionIcon
            label="รหัสคำขอ"
            data={data?.requestID}
            icon={<UserOutlined />}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <DescriptionIcon
            label="อีเมล"
            data={data?.email}
            icon={<MailOutlined />}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <DescriptionIcon
            label="ประเภทคำขอ"
            data={<Tag>{data?.typeRequest}</Tag>}
            icon={<FileUnknownOutlined />}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <DescriptionIcon
            label="สถานะ"
            data={data?.status?.toUpperCase()}
            icon={<FileSyncOutlined />}
          />
        </Descriptions.Item>
      </Descriptions>
      <Divider />

      <CommentBox
        module="dsar"
        submodule="task"
        pageidorname={taskId}
      />

      <TaskDetailRequestDetailDrawer
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
      />
    </>
  );
};
