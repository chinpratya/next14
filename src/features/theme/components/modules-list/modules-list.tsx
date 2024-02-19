import { Empty } from 'antd';

import { getModules } from '@/utils/module';

import {
  ModulesItems,
  ModulesItemsProps,
} from '../modules-items';

export type ModulesListProps = Pick<
  ModulesItemsProps,
  'onClick'
> & {
  appId?: string;
  search?: string;
};

export const ModulesList = ({
  appId,
  search,
  onClick,
}: ModulesListProps) => {
  const modules = getModules(appId, search);

  return (
    <>
      {modules.length > 0 ? (
        <ModulesItems items={modules} onClick={onClick} />
      ) : (
        <Empty />
      )}
    </>
  );
};
