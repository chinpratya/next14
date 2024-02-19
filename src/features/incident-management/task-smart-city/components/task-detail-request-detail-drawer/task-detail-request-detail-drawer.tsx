import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Descriptions,
  Divider,
  Drawer,
  Typography,
} from 'antd';

import { Flex } from '@components/flex';

export type TaskDetailRequestDetailDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export const TaskDetailRequestDetailDrawer = ({
  open,
  onClose,
}: TaskDetailRequestDetailDrawerProps) => {
  return (
    <Drawer
      placement="right"
      open={open}
      onClose={onClose}
      closable={false}
    >
      <Flex flexDirection="column" alignItems="center">
        <Avatar icon={<UserOutlined />} size={110} />
        <Typography.Title level={3} className="mt-2 mb-0">
          Pawan Nakwitra
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Text type="secondary">
        REQUEST DETAILS
      </Typography.Text>
      <Descriptions
        column={1}
        layout="vertical"
        labelStyle={{
          fontWeight: 'bold',
        }}
        className="mt-2 mb-4"
      >
        <Descriptions.Item label="Request ID">
          AYQVLN9X92
        </Descriptions.Item>
        <Descriptions.Item label="Stage">
          In Progress
        </Descriptions.Item>
        <Descriptions.Item label="Request Type">
          Delete My Information
        </Descriptions.Item>
        <Descriptions.Item label="Subject Type">
          Myself
        </Descriptions.Item>
      </Descriptions>

      <Typography.Text type="secondary">
        FORM VALUES
      </Typography.Text>
      <Descriptions
        column={1}
        layout="vertical"
        labelStyle={{
          fontWeight: 'bold',
        }}
        className="mt-2 mb-4"
      >
        <Descriptions.Item label="อีเมล">
          pakawaaaa.nk@gmail.com
        </Descriptions.Item>
        <Descriptions.Item label="ชื่อ">
          สาริณี
        </Descriptions.Item>
        <Descriptions.Item label="นามสกุล">
          นอบน้อม
        </Descriptions.Item>
        <Descriptions.Item label="อายุ">
          21
        </Descriptions.Item>
        <Descriptions.Item label="ประเทศ">
          ไทย
        </Descriptions.Item>
        <Descriptions.Item label="ที่อยู่">
          185 หมู่ 1 ตำบล หมูป่า อำเภอ น้ำนอง
        </Descriptions.Item>
        <Descriptions.Item label="จังหวัด">
          นครราชสีมา
        </Descriptions.Item>
        <Descriptions.Item label="รหัสไปรษณีย์">
          30130
        </Descriptions.Item>
        <Descriptions.Item label="เบอร์ติดต่อ">
          0855559638
        </Descriptions.Item>
        <Descriptions.Item label="เหตุผลประกอบคำร้องขอ">
          ต้องการลบข้อมูลในส่วนของ
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
