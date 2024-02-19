import { ReactNode } from 'react';

import { TaskList } from '@/features/dsar-automation';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const TaskPage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.task.title" />
        }
      />
      <TaskList />
    </>
  );
};

TaskPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['dsar'],
      productName: products.pdpakit,
      policies: [permissions['pdpakit:dsar:task:read']],
    }}
  >
    {page}
  </AppLayout>
);

export default TaskPage;
