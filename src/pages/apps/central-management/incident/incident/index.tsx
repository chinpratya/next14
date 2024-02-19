// import { PlusCircleOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  Request,
  RequestCreateModal,
  RequestList,
} from '@/features/incident-management';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';

const IncidentPage = () => {
  const router = useRouter();
  const toggle = useToggle();

  const onEdit = (request: Request) =>
    router.push(`${router.asPath}/${request.requestID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="incidentManagement.incident.title" />
        }
        // extra={
        //   <Button
        //     type="primary"
        //     icon={<PlusCircleOutlined />}
        //     onClick={() => toggle.create()}
        //   >
        //     <span>
        //       <IntlMessage id="incidentManagement.incident.create.button" />
        //     </span>
        //   </Button>
        // }
      />
      <RequestList onEdit={onEdit} />
      <RequestCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};

IncidentPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default IncidentPage;
