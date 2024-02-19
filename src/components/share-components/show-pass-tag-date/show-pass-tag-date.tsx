import { ClockCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export type ShowPassTagDateProps = {
  date: string | null | undefined;
  backgroundColor?: string;
};

export const ShowPassTagDate = ({
  date,
  backgroundColor = '#F7F7F8',
}: ShowPassTagDateProps) => {
  if (!date) {
    return <div>-</div>;
  }
  const dueDate = dayjs(date).diff(dayjs());

  return (
    <Tag
      className={css`
        .anticon {
          margin-right: 5px;
        }

        background-color: ${backgroundColor};
      `}
    >
      <ClockCircleOutlined />
      {dueDate < 0
        ? 'หมดเวลา'
        : dayjs(date).from(dayjs())}
    </Tag>
  );
};
