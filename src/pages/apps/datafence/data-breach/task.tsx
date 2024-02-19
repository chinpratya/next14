import { ReactNode } from 'react';

import { TaskList } from '@/features/data-breach';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions, products } from '@/permissions';

const TaskPage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.dataBreach.task.title}
          />
        }
      />
      <TaskList />
    </>
  );
};

TaskPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:databreach:task:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default TaskPage;
