import { css } from '@emotion/css';
import { Tag as AntdTag } from 'antd';
import React, { ReactNode } from 'react';

import { BLACK_COLOR } from '@/config/color';

export type TagItem = {
  key: string;
  label: string | ReactNode | JSX.Element;
  color?: string;
  style?: React.CSSProperties;
  schema?: 'filled' | 'outlined';
};

export type TagItemsProps = {
  tags?: string[];
  items?: TagItem[];
  tagStyle?: React.CSSProperties;
  schema?: 'filled' | 'outlined';
};

export const Tag = ({
  label,
  color = BLACK_COLOR,
  style,
  schema = 'filled',
}: TagItem) => {
  return (
    <AntdTag
      className={css`
        color: ${color} !important;
        background: ${`${color}10`} !important;
        border: 1px solid ${color} !important;
        padding: 2px 10px;
      `}
      style={style}
    >
      {label}
    </AntdTag>
  );
};

export const TagItems = ({
  tags = [],
  items = [],
  tagStyle,
  schema = 'filled',
}: TagItemsProps) => {
  return (
    <div
      className={css`
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      `}
    >
      {tags
        .filter(
          (tag, index) => tags.indexOf(tag) === index
        )
        .map((tag) => {
          const item = items.find(
            (item) => item.key === tag
          );
          if (!item) {
            return null;
          }
          return (
            <Tag
              {...item}
              key={item.key}
              style={tagStyle}
              schema={schema}
            />
          );
        })}
    </div>
  );
};
