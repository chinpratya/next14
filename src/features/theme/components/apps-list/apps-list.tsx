import { motion } from 'framer-motion';

import { APPS_CONFIG } from '@/config/modules';

import { AppsItems, AppsItemsProps } from '../apps-items';

type AppsListProps = Pick<
  AppsItemsProps,
  'onClick' | 'current'
> & {
  search?: string;
};
export const AppsList = ({
  current,
  onClick,
  search,
}: AppsListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, marginBottom: 0 }}
      animate={{
        opacity: !search ? 1 : 0,
        display: !search ? 'block' : 'none',
      }}
    >
      <AppsItems
        items={APPS_CONFIG}
        current={current}
        onClick={onClick}
      />
    </motion.div>
  );
};
