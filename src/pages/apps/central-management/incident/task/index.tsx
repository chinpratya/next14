import { ReactNode } from 'react';

import { TaskList } from '@/features/incident-management';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';

const TaskPage = () => {
  return (
    <>
      <PageHeader title="งาน" />
      <TaskList />
    </>
  );
};

TaskPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TaskPage;
