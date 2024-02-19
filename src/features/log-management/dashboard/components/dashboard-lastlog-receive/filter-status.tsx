import { css } from '@emotion/css';
import { Flex } from '@mantine/core';

export const FilterStatus = [
  {
    text: (
      <div
        className={css`
          display: inline-block;
          margin-left: 8px;
        `}
      >
        <Flex align="center" gap={10}>
          <span
            className={css`
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #03d182;
            `}
          />
          ต่ำกว่า 1 นาที
        </Flex>
      </div>
    ),
    value: 'GREEN',
  },
  {
    text: (
      <div
        className={css`
          display: inline-block;
          margin-left: 8px;
        `}
      >
        <Flex align="center" gap={10}>
          <span
            className={css`
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #fb8a14;
            `}
          />
          ต่ำกว่า 5 นาที
        </Flex>
      </div>
    ),
    value: 'ORANGE',
  },
  {
    text: (
      <div
        className={css`
          display: inline-block;
          margin-left: 8px;
        `}
      >
        <Flex align="center" gap={10}>
          <span
            className={css`
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #e6ebf1;
            `}
          />
          มากกว่า 5 นาที
        </Flex>
      </div>
    ),
    value: 'GRAY',
  },
];
