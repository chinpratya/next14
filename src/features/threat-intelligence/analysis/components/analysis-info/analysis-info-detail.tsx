import { Flex } from '@mantine/core';
import { Card, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

import { ShowPassTagDate } from '@/components/share-components/show-pass-tag-date';
import { ShowTagDate } from '@/components/share-components/show-tag-date';

export const AnalysisInfoDetail = () => {
  return (
    <Card title="รายละเอียด" className="h-100">
      <Flex gap={32}>
        <Typography>
          วันที่แก้ไขล่าสุด :{' '}
          <ShowPassTagDate date={dayjs().toString()} />
        </Typography>
        <Typography>
          วันที่สร้าง :{' '}
          <ShowTagDate date={dayjs().toString()} />
        </Typography>
      </Flex>
      <Typography className="mt-3">
        แหล่งข่าว : <Tag>Cyberfence</Tag>
      </Typography>
      <Typography className="mt-3">
        ระดับความเสี่ยง : <Tag>ต่ำ</Tag>
      </Typography>
      <Typography className="mt-3">
        ประเภทการโจมตี :{' '}
        {[
          'SSH',
          'Honeypot',
          'Brute-Force',
          'Password Attack',
        ].map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </Typography>
      <Typography className="mt-3">
        หมวดหมู่ :{' '}
        {['IOC', 'Windows', 'MISP FEED'].map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </Typography>
    </Card>
  );
};
