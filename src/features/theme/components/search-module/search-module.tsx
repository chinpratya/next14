import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Typography, Input } from 'antd';

import {
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '@/config/color';

export type SearchModuleProps = {
  search: string | null;
  onSearch: (value: string) => void;
};
export const SearchModule = ({
  search,
  onSearch,
}: SearchModuleProps) => {
  return (
    <div
      className={css`
        background-color: ${PRIMARY_COLOR};
        margin: -25px -25px 0 -25px;
        padding: 24px;
        display: flex;
        justify-content: center;

        .ant-typography {
          color: ${WHITE_COLOR} !important;
          margin-bottom: 24px;
        }

        .box-search {
          padding: 30px 0;
          text-align: center;
          width: 600px;
        }
      `}
    >
      <div className="box-search">
        <Typography.Title>ค้นหาโมดูล</Typography.Title>
        <Input
          prefix={<SearchOutlined />}
          value={search ?? ''}
          onChange={(event) =>
            onSearch(event.target.value)
          }
          placeholder="ค้นหา"
        />
      </div>
    </div>
  );
};
