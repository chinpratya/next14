import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Typography } from 'antd';
import Image from 'next/image';

export const WebformFooter = () => {
  return (
    <Card
      className={css`
        overflow: hidden;
        border-top: 3px solid #fa0f0b;

        .ant-card-body {
          padding: 14px;
        }
      `}
    >
      <Flex gap="md" className="ml-2">
        <Image
          width={90}
          height={70}
          className={`${css`
            margin-top: -5px;
          `}`}
          src="/img/logo-ha.png"
          alt="ha logo"
        />

        <Flex direction="column" gap="3px">
          <Typography.Text strong>
            สถาบันรับรองคุณภาพสถานพยาบาล (องค์การมหาชน)
          </Typography.Text>
          <Typography.Text>
            ที่อยู่: เลขที่ 88/39 อาคารสุขภาพแห่งชาติ ชั้น
            5 กระทรวงสาธารณสุข ซอย 6 ถนนติวานนท์
            ตำบลตลาดขวัญ อำเภอเมืองนนทบุรี จังหวัดนนทบุรี
            11000.
          </Typography.Text>
          <Typography.Text>
            โทรศัพท์: 02 027 8844 โทรสาร: 02 026 6680
          </Typography.Text>
          <Typography.Text>
            อีเมล: hathailand@ha.or.th
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};
