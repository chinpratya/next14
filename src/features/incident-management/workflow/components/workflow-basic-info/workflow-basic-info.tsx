import {
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Space,
  Switch,
  Tooltip,
  Modal,
  Divider,
} from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ShowTagDate } from '@components/show-tag-date';

import { Workflow } from '../../types';
import { SlaSeverityTable } from '../sla-severity-table';

type WorkflowBasicInfoProps = {
  workflow?: Workflow;
  onEdit?: () => void;
};

export const WorkflowBasicInfo = ({
  workflow,
  onEdit,
}: WorkflowBasicInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <Card
      title={
        <Space>
          รายละเอียด
          <Button
            type="link"
            onClick={() => {
              router.push(
                `/apps/datafence/incident-management/workflow/create`
              );
            }}
          >
            แก้ไข <EditOutlined />
          </Button>
        </Space>
      }
      extra={
        <Space>
          การใช้งาน :
          <Switch />
          <Divider
            type="vertical"
            style={{ height: 40 }}
          />
          <Button
            type="primary"
            style={{
              marginLeft: 10,
            }}
            onClick={showModal}
          >
            ดูระยะเวลาการดำเนิน SLA
          </Button>
          <Modal
            open={isModalOpen}
            onCancel={handleOk}
            footer={[
              <Button
                key="submit"
                type="primary"
                onClick={handleOk}
              >
                ปิด
              </Button>,
            ]}
            width={1200}
            style={{ top: 50 }}
            bodyStyle={{
              paddingTop: 50,
              height: 500,
            }}
            className={css`
              .ant-modal-close-x {
                padding-right: 50px;
                width: 50px;
                height: 20px;
              }
              .ant-modal-body {
                padding: 10px 10px 0px 0px;
                font-size: 14px;
                line-height: 1.5;
              }
              .ant-modal-footer {
                padding: 10px 16px;
                text-align: right;
                background: 0 0;
                border-top: 0px solid #e6ebf1;
                border-radius: 0 0 0.625rem 0.625rem;
              }
            `}
          >
            <SlaSeverityTable />
          </Modal>
        </Space>
      }
      className={css`
        height: 100%;
      `}
    >
      <Divider
        type="horizontal"
        style={{
          width: '100%',
          marginTop: -5,
          marginBottom: 20,
          marginLeft: 0,
          marginRight: 0,
        }}
      />

      <Descriptions
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        layout="vertical"
      >
        <Descriptions.Item label="วันที่สร้าง">
          <ShowTagDate date={'2023-10-22T06:25:16Z'} />
        </Descriptions.Item>

        <Descriptions.Item label="สร้างโดย">
          {workflow?.name || `Punyisa Supannapakin`}
        </Descriptions.Item>

        <Descriptions.Item label="วันที่แก้ไข">
          <ShowTagDate date={'2023-10-31T06:25:16Z'} />
        </Descriptions.Item>

        <Descriptions.Item label="แก้ไขโดย">
          {workflow?.name || `Punyisa Supannapakin`}
        </Descriptions.Item>

        <Descriptions.Item label="ชื่อ" span={4}>
          {workflow?.name || `เกิดเหตุเพลิงไหม้`}
        </Descriptions.Item>

        <Descriptions.Item label="รายละเอียด" span={4}>
          {workflow?.name ||
            `รายละเอียดแผนการตอบสนองเหตุไฟไหม้ (Fire Incident Response Plan) เป็นเอกสารที่ระบุกำหนดลำดับขั้นตอนและการกระทำที่ควรทำในกรณีเกิดเหตุเพลิงไหม้ ด้านล่างนี้เป็นตัวอย่างของรายละเอียดแผนการตอบสนองเหตุไฟไหม้`}
        </Descriptions.Item>

        <Descriptions.Item label="ผู้เกี่ยวข้อง" span={2}>
          <Avatar.Group
            maxCount={6}
            maxPopoverTrigger="click"
            maxStyle={{
              backgroundColor: 'rgb(246, 246, 246)',
              color: '#3e79f7',
              cursor: 'pointer',
            }}
          >
            {workflow?.stakeholders.map((stakeholder) => {
              return (
                <Tooltip
                  key={stakeholder.email}
                  title={stakeholder.email}
                  placement="top"
                >
                  <Avatar
                    src={stakeholder.avatar}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </Descriptions.Item>

        <Descriptions.Item
          label="ระยะเวลาในการดำเนินการของแผนการตอบสนอง"
          span={2}
        >
          {workflow?.name ||
            `ระยะเวลาในการตอบสนอง กรณีไฟไหม้`}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
