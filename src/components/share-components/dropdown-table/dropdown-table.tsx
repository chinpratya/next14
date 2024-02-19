import { MoreOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Dropdown } from 'antd';
import { DropdownProps } from 'antd/lib/dropdown/dropdown';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export type DropdownTableProps = DropdownProps & {
  items?: Array<ItemType>;
};

export const DropdownTable = ({
  items = [],
  ...dropdownProps
}: DropdownTableProps) => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
      `}
    >
      <Dropdown menu={{ items }} {...dropdownProps}>
        <Button type="link" className="p-0">
          <MoreOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
