import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TagsList,
  TagsCreateModal,
} from '@/features/incident-management';
import { useToggle } from '@/hooks';
// import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const TagsIncidentPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title="ป้ายกำกับ"
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={toggle.create}
          >
            <IntlMessage id="dsarAutomation.tags.create" />
          </Button>
        }
      />
      <TagsList />
      <TagsCreateModal
        open={toggle.openCreate}
        onClose={toggle.create}
      />
    </>
  );
};

TagsIncidentPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TagsIncidentPage;
