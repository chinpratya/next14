import { CalendarOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Tag } from 'antd';
import dayjs from 'dayjs';

export type ShowTagDateProps = {
  date: string | null | undefined;
  backgroundColor?: string;
};

export const ShowTagDate = ({
  date,
  backgroundColor = '#F7F7F8',
}: ShowTagDateProps) => {
  if (!date || date === 'None' || date === '-') {
    return <div>-</div>;
  }

  const displayDate = dayjs(date).format(
    'DD MMM YYYY HH:mm:ss'
  );

  return (
    <Tag
      className={css`
        .anticon {
          margin-right: 5px;
        }

        background-color: ${backgroundColor};
      `}
    >
      <CalendarOutlined />
      {displayDate !== 'Invalid Date'
        ? displayDate
        : date}
    </Tag>
  );
};

export const renderDate = (date: string) => (
  <ShowTagDate date={date} />
);
