import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { SelectedRespondent } from '../../types';

export type OrganizationMenuProps = {
  respondentsReport: SelectedRespondent;
  currentInstitute: string;
  currentOpenKey: string;
  onCurrentInstituteChange?: (
    institute: string,
    organization: string
  ) => void;
};

export const BranchMenu = ({
  respondentsReport,
  currentInstitute,
  currentOpenKey,
  onCurrentInstituteChange,
}: OrganizationMenuProps) => {
  const [items, setItems] = useState<MenuProps['items']>(
    []
  );

  const onClick = (item: { keyPath: string[] }) => {
    const [branch, organization] = item.keyPath;
    onCurrentInstituteChange?.(branch, organization);
  };

  useEffect(() => {
    const loadItems = () => {
      if (Object.keys(respondentsReport).length > 0) {
        const value = Object.values(
          respondentsReport
        ).map((item) => {
          return {
            key: item.id,
            label: item.name,
            children: Object.values(item.branchs).map(
              ({ id, name }) => ({
                key: id,
                label: name,
              })
            ),
          };
        });

        setItems(value);
      } else setItems([]);
    };
    loadItems();
  }, [respondentsReport]);

  return (
    <div className="w-100">
      <div className="mobile-nav-menu">
        <Scrollbars autoHide>
          <Menu
            mode="inline"
            items={items}
            selectedKeys={[currentInstitute]}
            defaultOpenKeys={[currentOpenKey]}
            onClick={onClick}
          />
        </Scrollbars>
      </div>
    </div>
  );
};
