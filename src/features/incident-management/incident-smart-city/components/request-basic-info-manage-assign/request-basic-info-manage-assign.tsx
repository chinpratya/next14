import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Descriptions } from 'antd';

import { useToggle } from '@/hooks';

import { RequestDetail } from '../../types';
import { RequestBasicInfoManageAssignModal } from '../request-basic-info-manage-assign-modal';

type RequestBasicInfoManageAssignProps = {
  data?: RequestDetail;
};

export const RequestBasicInfoManageAssign = ({
  data,
}: RequestBasicInfoManageAssignProps) => {
  const toggle = useToggle();

  return (
    <>
      <Card
        title="มอบหมาย"
        extra={
          <Button
            type="primary"
            ghost
            onClick={() => toggle.change()}
          >
            จัดการมอบหมาย
          </Button>
        }
      >
        <Descriptions column={1} layout="vertical">
          <Descriptions.Item label="ผู้อนุมัติ">
            {data?.approved ? (
              <>
                <Avatar
                  className="mr-2"
                  icon={<UserOutlined />}
                />
                {data?.approved}
              </>
            ) : (
              'ไม่ระบุ'
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <RequestBasicInfoManageAssignModal
        open={toggle.openChange}
        onCancel={() => toggle.change()}
        requestId={data?.requestID as string}
      />
    </>
  );
};
