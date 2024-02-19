import {
  CaretDownOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Typography } from 'antd';
import _ from 'lodash';
import { useMemo, useState } from 'react';

import { getKeysOfObject } from '@/utils';

export const TextEventOriginal = ({
  text,
}: {
  text: string;
}) => {
  const [expand, setExpand] = useState(false);

  const object = Object.fromEntries(
    Object.entries(JSON.parse(text)).filter(
      ([key]) => !key.startsWith('onefence')
    )
  );

  const fields = useMemo(
    () => getKeysOfObject(object),
    [object]
  );

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

      <Flex gap={8} wrap="wrap" className="w-100">
        {(expand ? fields : fields.slice(0, 6)).map(
          (key, index) => {
            const value = _.get(object, key) as string;

            const isEllipsis =
              index <= 5 && !expand && value.length > 120;

            return (
              <Flex
                key={key}
                gap={5}
                style={{ maxWidth: '100%' }}
              >
                <Typography.Text
                  className={css`
                    background-color: #e5eef4;
                    padding: 0 4px;
                    border-radius: 4px;
                    height: fit-content;
                  `}
                >
                  {key}:
                </Typography.Text>
                {isEllipsis ? (
                  <Typography.Paragraph
                    className={css`
                      margin-bottom: 0 !important;
                      white-space: break-spaces;
                    `}
                    ellipsis={
                      isEllipsis ? { rows: 2 } : undefined
                    }
                  >
                    {value}
                  </Typography.Paragraph>
                ) : (
                  <Typography.Text
                    className={css`
                      white-space: break-spaces;
                      overflow: hidden;
                    `}
                  >
                    {value}
                  </Typography.Text>
                )}
              </Flex>
            );
          }
        )}
      </Flex>
    </Flex>
  );
};
