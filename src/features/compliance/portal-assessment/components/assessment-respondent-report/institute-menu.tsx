import { Menu } from 'antd';
import { useEffect } from 'react';

import { RespondentsReport } from '../../types/assessment';

export type OrganizationMenuProps = {
  respondentsReport?: RespondentsReport;
  currentInstitute: string;
  onCurrentInstituteChange?: (institute: string) => void;
};
export const InstituteMenu = ({
  respondentsReport,
  currentInstitute,
  onCurrentInstituteChange,
}: OrganizationMenuProps) => {
  const getInstituteItems = () => {
    if (!respondentsReport) {
      return [];
    }

    const items = respondentsReport?.institutes.map(
      (respondent) => {
        return {
          key: respondent.ObjectUUID,
          label: respondent.name,
        };
      }
    );
    return [
      {
        key: respondentsReport.name,
        label: respondentsReport.name,
        children: items,
      },
    ];
  };

  const onClick = (item: { key: string }) => {
    const institute = item.key;
    onCurrentInstituteChange?.(institute);
  };

  const defaultOpenKeys = respondentsReport?.name
    ? [respondentsReport.name]
    : [];

  useEffect(() => {
    if (currentInstitute === '' && respondentsReport) {
      onCurrentInstituteChange?.(
        respondentsReport.institutes[0]?.ObjectUUID
      );
    }
  }, [
    respondentsReport,
    currentInstitute,
    onCurrentInstituteChange,
  ]);

  return (
    <Menu
      mode="inline"
      onClick={onClick}
      selectedKeys={[currentInstitute]}
      defaultOpenKeys={defaultOpenKeys}
      items={getInstituteItems()}
    />
  );
};
