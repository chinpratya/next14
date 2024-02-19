import { Card } from 'antd';

import { IncidentList } from '@/features/incident-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';

export const IncidentPage = () => {
  return (
    <FallbackError isError={false}>
      <PageHeader title="Incident" />
      <Card>
        <IncidentList />
      </Card>
    </FallbackError>
  );
};

IncidentPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default IncidentPage;
