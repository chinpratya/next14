import { Card, Menu as AntdMenu } from 'antd';
import {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  DocumentationFilebeat,
  DocumentationSyslogNg,
  DocumentationWinlogbeat,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { InnerAppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

type Menu = 'winlogBeat' | 'syslogNg' | 'fileBeat';

const DocumentationPage = () => {
  const [menu, setMenu] = useState<Menu>('winlogBeat');
  const scrollbarRef = useRef<Scrollbars>(null);

  const items = [
    { label: 'Winlogbeat', key: 'winlogBeat' },
    { label: 'Syslog-ng', key: 'syslogNg' },
    { label: 'Filebeat', key: 'fileBeat' },
  ];

  useEffect(() => {
    if (scrollbarRef.current)
      scrollbarRef.current.scrollToTop();
  }, [menu]);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.document.documentation" />
        }
      />

      <Card bodyStyle={{ padding: 0 }}>
        <InnerAppLayout
          sideContentWidth={250}
          sideContent={
            <AntdMenu
              selectedKeys={[menu]}
              items={items}
              mode="inline"
              onClick={(e) => setMenu(e.key as Menu)}
            />
          }
          mainContent={
            <Scrollbars ref={scrollbarRef}>
              {menu === 'winlogBeat' ? (
                <DocumentationWinlogbeat />
              ) : menu === 'syslogNg' ? (
                <DocumentationSyslogNg />
              ) : (
                <DocumentationFilebeat />
              )}
            </Scrollbars>
          }
        />
      </Card>
    </>
  );
};

DocumentationPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default DocumentationPage;
