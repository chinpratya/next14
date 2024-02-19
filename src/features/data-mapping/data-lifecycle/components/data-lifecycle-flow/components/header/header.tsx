import { css } from '@emotion/css';
import { Typography } from 'antd';

export type HeaderProps = {
  columns: Array<[string, string]>;
};

export const Header = ({ columns = [] }: HeaderProps) => {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-item {
          width: ${100 / columns.length}%;
          min-width: 150px;
          text-align: center;
          padding: 15px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          ::before {
            content: '';
          }

          ::after {
            content: url('/icon/double-right-outlined.svg');
            margin-bottom: -7px;
          }

          :last-child {
            ::after {
              content: '';
            }
          }
        }
      `}
    >
      {columns.map(([key, label]) => (
        <div className="header-item" key={key}>
          <Typography.Title className="m-0" level={4}>
            {label}
          </Typography.Title>
        </div>
      ))}
    </div>
  );
};
