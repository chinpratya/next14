import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Typography } from 'antd';

type ReportPieTotalInformationProps = {
  totalValue?: string;
  totalUnit?: string;
};

export const ReportPieTotalInformation = ({
  totalUnit,
  totalValue,
}: ReportPieTotalInformationProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      className={css`
        position: absolute;
        top: 32px;
        left: 50%;
        transform: translateX(-50%);
        width: 130px;
        height: 70%;
        font-weight: bold;
        border-radius: 60px;
      `}
    >
      <Typography.Text
        className={css`
          font-size: 13px;
        `}
      >
        ข้อมูลทั้งหมด
      </Typography.Text>
      {totalValue && (
        <Typography.Text
          className={css`
            font-size: 36px;
            height: 40px;
            display: flex;
            align-items: center;
          `}
        >
          {totalValue}
        </Typography.Text>
      )}
      {totalUnit && (
        <Typography.Text
          className={css`
            font-size: 13px;
          `}
        >
          {totalUnit}
        </Typography.Text>
      )}
    </Flex>
  );
};
