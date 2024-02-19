import { PlusCircleOutlined } from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  MeasureList,
  MeasureCreateDialog,
  MeasureType,
} from '@/features/risk-assessment';
import { PermissionWrapper } from '@/features/shared';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const MeasuresPage = () => {
  const [openCreate, toggleCreate] = useToggle();

  const router = useRouter();

  const onEdit = (measure: MeasureType) =>
    router.push(`${router.asPath}/${measure.ObjectUUID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.riskAssessment.riskMeasures.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'assessment'}
            policies={[
              permissions[
                'pdpakit:assessment:assessmentrisk:create'
              ],
            ]}
          >
            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              onClick={() => toggleCreate()}
            >
              <IntlMessage
                id={
                  tokens.riskAssessment.riskMeasures
                    .create
                }
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <MeasureList onEdit={onEdit} />
      <MeasureCreateDialog
        open={openCreate}
        onClose={toggleCreate}
      />
    </>
  );
};

MeasuresPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['assessment'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:assessment:assessmentrisk:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default MeasuresPage;
