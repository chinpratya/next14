import { css } from '@emotion/css';
import { Tag } from 'antd';

export type TagsProps = {
  color?: string;
  tags: string[];
};

export const Tags = ({ color, tags }: TagsProps) => {
  return (
    <div
      className={css`
        display: block;
      `}
    >
      {tags.map((tag) => (
        <Tag className="m-1" color={color} key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
