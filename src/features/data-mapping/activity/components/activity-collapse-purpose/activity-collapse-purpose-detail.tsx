import { Descriptions, Typography } from 'antd';
import _ from 'lodash';

import { Flex } from '@components/flex';
import { ShowTagStatus } from '@components/show-tag-status';

export const ActivityCollapsePurposeDetail = () => {
  const statusItems = [
    {
      label: 'เปิดเผย',
      key: 'เปิดเผย',
      color: '#04D182',
    },
    {
      label: 'โอน',
      key: 'โอน',
      color: '#FF4B4B',
    },
  ];
  const data = {
    name: 'ฐานกฎหมาย (Contract)',
    email: 'sp@gmail.com',
    tel: '09-0000-0000',
    address: 'sp',
    country: 'TH',
    url: '-',
    dcordp: 'dc',
    type: 'PDPA',
    data_transfer_type: {
      name: ' เปิดเผยโอนข้อมูลให้กับบริษัทภายนอก',
      type: ['เปิดเผย', 'โอน'],
    },
  };
  return (
    <>
      <Descriptions column={3} layout="vertical">
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* ชื่อ"
        >
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* อีเมล"
        >
          {data?.email}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* หมายเลขโทรศัพท์"
        >
          {data?.tel}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* ที่อยู่"
        >
          {data?.address}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* ประเทศ"
        >
          {data?.country}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="URL"
        >
          {data?.url}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* DC หรือ DP"
        >
          {data?.dcordp}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="* ประเภท"
        >
          {data?.country}
        </Descriptions.Item>
      </Descriptions>
      <div>
        <Typography.Title level={4}>
          ประเภทการโอนข้อมูล :
          {data?.data_transfer_type?.name}
        </Typography.Title>
        <Flex>
          {_.map(data.data_transfer_type.type, (v) => {
            return (
              <ShowTagStatus
                status={`${v}`}
                items={statusItems}
              />
            );
          })}
        </Flex>
      </div>
    </>
  );
};
