import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Row,
  Select,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useListLogSearchHost } from '@/features/log-management';

import { ReportIndexSelectIndices } from './report-index-select-indices';

const RangePicker = dynamic(
  () =>
    import('@/components/share-components/range-picker'),
  {
    ssr: false,
  }
);

type ReportIndexFilterProps = {
  form: FormInstance;
  onSearch: () => void;
};

export const ReportIndexFilter = ({
  form,
  onSearch,
}: ReportIndexFilterProps) => {
  const { t } = useTranslation();
  const indiceId = Form.useWatch('indices', form);

  const listHost = useListLogSearchHost({
    module: 'LM',
    type: 'indices',
    value: indiceId,
    response_type: 'list',
    enabled: !!indiceId ? true : false,
  });

  const hostnameOptions = [
    { label: t('logManagement.all'), value: '' },
    ...(listHost.data?.data ?? []),
  ];

  const onDisabledDate = (current: Dayjs) => {
    const today = dayjs().endOf('day');
    const thirtyDaysAgo = dayjs()
      .subtract(30, 'days')
      .endOf('day');

    return (
      current.isAfter(today) ||
      current.isBefore(thirtyDaysAgo)
    );
  };

  const onChangeHostname = (hostname: string[]) => {
    if (hostname.length < 1) return;

    const allHostnameIndex = hostname.findIndex(
      (item) => item === ''
    );

    if (
      allHostnameIndex === -1 ||
      (allHostnameIndex === 0 && hostname.length === 1)
    ) {
      return;
    }

    if (allHostnameIndex === 0) {
      form.setFieldValue(
        'hostname',
        hostname.slice(1, hostname.length)
      );
      return;
    }

    form.setFieldValue(
      'hostname',
      hostname.splice(allHostnameIndex, 1)
    );
  };

  return (
    <Card>
      <Form layout="vertical" form={form}>
        <Row
          gutter={[16, 16]}
          className={css`
            max-width: 100%;
          `}
        >
          <Col span={7}>
            <ReportIndexSelectIndices form={form} />
          </Col>
          <Col span={6}>
            <Form.Item
              label={
                <IntlMessage id="logManagement.report.hostname" />
              }
              name="hostname"
              initialValue={['']}
            >
              <Select
                mode="multiple"
                loading={listHost.isLoading}
                options={hostnameOptions}
                onChange={onChangeHostname}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={
                <IntlMessage id="logManagement.report.timestamp" />
              }
              name="timestamp"
              initialValue={[
                dayjs()
                  .subtract(29, 'day')
                  .startOf('day'),
                dayjs(),
              ]}
            >
              <RangePicker
                className="w-100"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                allowClear={false}
                disabledDate={onDisabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label=" ">
              <Button
                icon={<SearchOutlined className="mr-2" />}
                type="primary"
                onClick={onSearch}
              >
                <IntlMessage id="logManagement.search" />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
