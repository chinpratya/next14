import {
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';

type LogSearchTextExpandProps = {
  text: string;
};

export const LogSearchTextExpand = ({
  text,
}: LogSearchTextExpandProps) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setExpand(false);
  }, [text]);

  return (
    <Flex gap={10}>
      {expand ? (
        <CaretDownOutlined
          className="pt-1 cursor-pointer"
          style={{ height: 14 }}
          onClick={() => setExpand((prev) => !prev)}
        />
      ) : (
        <CaretRightOutlined
          className="pt-1 cursor-pointer"
          style={{ height: 14 }}
          onClick={() => setExpand((prev) => !prev)}
        />
      )}
      <Typography.Paragraph
        style={{
          width: 400,
          whiteSpace: 'break-spaces',
          marginBottom: 0,
        }}
        className={css`
          display: -webkit-box;
          -webkit-line-clamp: ${expand ? 'none' : 5};
          -webkit-box-orient: vertical;
          overflow: hidden;
        `}
      >
        {text}
      </Typography.Paragraph>
    </Flex>
  );
};
