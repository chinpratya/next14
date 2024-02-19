import { Button, Card, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { PermissionWrapper } from '@/features/shared';
import {
  IncidentDetail,
  IncidentInfo,
  useGetIncident,
  IncidentSiemActionModal,
  // IncidentLogActivityList,
  IncidentLogSearchActivityList,
} from '@/features/siem';
import { useToggle } from '@/hooks';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const IncidentManagementPage = () => {
  const router = useRouter();
  const toggle = useToggle<IncidentInfo>();

  const incidentId = router.query.indexId as string;

  const { data, isLoading, isError } = useGetIncident({
    incidentId,
  });

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={() =>
          router.push(
            '/apps/cyberfence/siem/incident-management'
          )
        }
        title={
          <IntlMessage id="siem.incidentManagementDetails.incidentManagement" />
        }
        subtitle={data?.data.rule_name}
        extra={
          <PermissionWrapper
            moduleName="siem"
            policies={[
              permissions['cyber:siem:incident:update'],
            ]}
          >
            <Button
              type="primary"
              onClick={() => toggle.edit()}
            >
              <IntlMessage id="siem.incidentManagementDetails.siemAction" />
            </Button>
          </PermissionWrapper>
        }
      />

      {isLoading ? (
        <>
          <Card>
            <Skeleton paragraph={{ rows: 5 }} />
          </Card>
          <Card className="mt-4">
            <Skeleton paragraph={{ rows: 5 }} />
          </Card>
        </>
      ) : (
        <>
          <IncidentDetail incident={data?.data} />

          {data && (
            <IncidentLogSearchActivityList
              incident={data}
              loading={isLoading}
            />
          )}
        </>
      )}

      <IncidentSiemActionModal
        incident={data?.data}
        open={toggle.openEdit}
        onClose={toggle.edit}
      />
    </FallbackError>
  );
};

IncidentManagementPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [
          permissions['cyber:siem:incident:read'],
        ],
      }}
    >
      {page}
    </AppLayout>
  );
};

export default IncidentManagementPage;
