import { CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Tag, Typography } from 'antd';

type FilterTagItemProps = {
  field: string;
  condition: string;
  value: string | string[];
  onClick?: () => void;
  onDelete?: () => void;
};

export const FilterTagItem = ({
  field,
  condition,
  value,
  onClick,
  onDelete,
}: FilterTagItemProps) => {
  return (
    <Tag
      className={css`
        border-radius: 10px;
        background-color: #f2efff;
      `}
      onClick={onClick}
    >
      <Typography.Text
        ellipsis={{
          tooltip: (
            <Flex
              direction="column"
              className={css`
                span {
                  color: #fff;
                }
              `}
            >
              <Typography.Text>
                Field : {field}
              </Typography.Text>
              <Typography.Text>
                Operator : {condition}
              </Typography.Text>
              <Typography.Text>
                Value :{' '}
                {Array.isArray(value)
                  ? value.join(' , ')
                  : value}
              </Typography.Text>
            </Flex>
          ),
        }}
        className={css`
          color: #704aff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 140px !important;
        `}
      >
        <span className="mr-1">Field “{field}”</span>
        <span className="mr-1">
          Operator “{condition}”
        </span>
        <span>{`Value ${
          Array.isArray(value)
            ? `“${value.join(' , ')}”`
            : `“${value}”`
        }`}</span>
      </Typography.Text>
      <CloseOutlined
        className={css`
          margin-left: 0;
          color: #704aff;
          cursor: pointer;

          &:hover {
            color: #5c30fb;
          }
        `}
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
      />
    </Tag>
  );
};
