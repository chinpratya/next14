import { SettingOutlined } from '@ant-design/icons';
import { useLocalStorage } from '@mantine/hooks';
import {
  Row,
  Col,
  Radio,
  Popover,
  Checkbox,
  Button,
} from 'antd';
import { ReactNode, useState } from 'react';

import {
  DashboardDsarTotalNumberOfData,
  DashboardDsarDailyRequests,
  DashboardDsarTypeOfRequests,
  DashboardDsarTaskWebformRequest,
  DashboardDsarTask,
} from '@/features/data-breach';
import { AppLayout } from '@/layouts';
import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions, products } from '@/permissions';

const DSAR_DASHBOARD_WIDGETS = [
  {
    key: 'receipt-request',
    label: 'คำขอที่ได้รับ',
  },
  {
    key: 'request-pending',
    label: 'คำขอที่กำลังดำเนินการ',
  },
  {
    key: 'request-success',
    label: 'คำขอที่สำเร็จ',
  },
  {
    key: 'daily-requests',
    label: 'คำขอรายวัน',
  },
  {
    key: 'type-of-request',
    label: 'ประเภทคำขอ',
  },
  {
    key: 'all-task',
    label: 'งาน',
  },
  {
    key: 'task-of-webform',
    label: 'คำขอตามเว็บฟอร์ม',
  },
];

const DashboardPage = () => {
  const [usedWidgets, setUsedWidgets] = useLocalStorage({
    key: 'data-breach-dashboard-widgets',
    defaultValue: [
      'receipt-request',
      'request-pending',
      'request-success',
      'daily-requests',
    ],
  });

  const [duration, setDuration] = useState('month');

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.dashboard.title" />
        }
        extra={
          <Popover
            content={
              <div>
                <Checkbox.Group
                  value={usedWidgets}
                  onChange={(values) => {
                    setUsedWidgets(values as string[]);
                  }}
                  style={{ width: 250 }}
                >
                  <Row>
                    {DSAR_DASHBOARD_WIDGETS.map(
                      (widget, index) => (
                        <Col span={24} key={widget.key}>
                          <Checkbox
                            value={widget.key}
                            className="mb-2"
                            disabled={index < 4}
                          >
                            {widget.label}
                          </Checkbox>
                        </Col>
                      )
                    )}
                  </Row>
                </Checkbox.Group>
              </div>
            }
            placement="bottomRight"
          >
            <Button
              icon={<SettingOutlined />}
              type="primary"
              className="mr-2"
              ghost
            >
              <IntlMessage id="dsarAutomation.dashboard.widgets" />
            </Button>
          </Popover>
        }
      />
      <Flex justifyContent="end" className="mb-2">
        <Radio.Group
          value={duration}
          buttonStyle="solid"
          onChange={(e) => setDuration(e.target.value)}
        >
          <Radio.Button value="day">
            <IntlMessage id="dsarAutomation.dashboard.day" />
          </Radio.Button>
          <Radio.Button value="week">
            <IntlMessage id="dsarAutomation.dashboard.week" />
          </Radio.Button>
          <Radio.Button value="month">
            <IntlMessage id="dsarAutomation.dashboard.month" />
          </Radio.Button>
          <Radio.Button value="year">
            <IntlMessage id="dsarAutomation.dashboard.year" />
          </Radio.Button>
        </Radio.Group>
      </Flex>
      <Row
        justify={'space-between'}
        align={'middle'}
        gutter={[10, 10]}
      >
        <Col {...getColLayout(24)}>
          <DashboardDsarTotalNumberOfData
            duration={duration}
          />
        </Col>
        <Col {...getColLayout(24)}>
          <DashboardDsarDailyRequests
            duration={duration}
          />
        </Col>
        <Col
          {...getColLayout(24)}
          hidden={
            !usedWidgets.includes('type-of-request')
          }
        >
          <DashboardDsarTypeOfRequests
            duration={duration}
          />
        </Col>
        <Col
          {...getColLayout([24, 24, 24, 24, 24, 12])}
          hidden={!usedWidgets.includes('all-task')}
        >
          <DashboardDsarTask duration={duration} />
        </Col>
        <Col
          {...getColLayout([24, 24, 24, 24, 24, 12])}
          hidden={
            !usedWidgets.includes('task-of-webform')
          }
        >
          <DashboardDsarTaskWebformRequest
            duration={duration}
          />
        </Col>
      </Row>
    </>
  );
};

DashboardPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:databreach:dashboard:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DashboardPage;
