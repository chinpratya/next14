import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useLogSearchStore } from '@/features/log-management';

import { LogSearchFilterIndice } from './log-search-filter-indice';

const RangePicker = dynamic(
  () =>
    import('@/components/share-components/range-picker'),
  { ssr: false }
);

export const LogSearchFilter = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const logSearchStore = useLogSearchStore();
  const { timestamp } = logSearchStore.data;

  const onSearch = () => {
    const indiceStore = logSearchStore.data.indices;
    if (!indiceStore && indiceStore === '') return;

    const values = form.getFieldsValue();
    delete values.indices;

    logSearchStore.onSetData({
      ...logSearchStore.data,
      ...values,
    });

    logSearchStore.onSetEnabled(true);
  };

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

  const onChangeDate = (value: [Dayjs, Dayjs]) => {
    const [_, to] = value;

    if (to.diff(timestamp[1], 'day') < 0) {
      logSearchStore.onSetCustomDate();
    } else {
      logSearchStore.onSetRefetch({
        ...logSearchStore.refetch,
        isCustomDate: false,
      });
    }
  };

  useEffect(() => {
    form.setFieldValue('timestamp', timestamp);
  }, [form, timestamp]);

  return (
    <FallbackError isError={logSearchStore.isError}>
      <Card>
        <Form
          form={form}
          initialValues={{
            timestamp,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item noStyle name="search">
                <Input.Search
                  onSearch={onSearch}
                  enterButton={
                    <Button
                      icon={
                        <SearchOutlined className="mr-2" />
                      }
                      loading={logSearchStore.isLoading}
                      type="primary"
                    >
                      <IntlMessage id="logManagement.search" />
                    </Button>
                  }
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <LogSearchFilterIndice form={form} />
            </Col>

            <Col span={7}>
              <Form.Item
                name="type"
                label={
                  <IntlMessage id="logManagement.logSearch.type" />
                }
                className="mb-0 w-100"
                initialValue="all"
              >
                <Select
                  className="w-100"
                  placeholder="Device Type"
                  options={[
                    {
                      label: (
                        <IntlMessage id="logManagement.all" />
                      ),
                      value: 'all',
                    },
                    { label: 'Syslog', value: 'syslog' },
                    { label: 'Filebeat', value: 'beat' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item
                name="timestamp"
                label={
                  <IntlMessage id="logManagement.logSearch.timestamp" />
                }
                className="mb-0"
              >
                <RangePicker
                  className="w-100"
                  onChange={(value) =>
                    onChangeDate(value as [Dayjs, Dayjs])
                  }
                  popupClassName={css`
                    .ant-picker-ranges {
                      display: flex;
                      flex-wrap: wrap;
                      width: 340px;
                      position: relative;
                      overflow: unset;
                    }
                    .ant-picker-ok {
                      position: absolute;
                      right: -41px;
                      bottom: 4px;
                    }
                  `}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  allowClear={false}
                  ranges={{
                    [t('logManagement.logSearch.minute', {
                      value: '10',
                    })]: [
                      dayjs().subtract(10, 'minutes'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.minute', {
                      value: '30',
                    })]: [
                      dayjs().subtract(30, 'minutes'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.hour', {
                      value: '1',
                    })]: [
                      dayjs().subtract(1, 'hours'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.hour', {
                      value: '6',
                    })]: [
                      dayjs().subtract(6, 'hours'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.hour', {
                      value: '12',
                    })]: [
                      dayjs().subtract(12, 'hours'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.day', {
                      value: '1',
                    })]: [
                      dayjs().subtract(1, 'd'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.day', {
                      value: '7',
                    })]: [
                      dayjs().subtract(7, 'd'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.day', {
                      value: '15',
                    })]: [
                      dayjs().subtract(15, 'd'),
                      dayjs(),
                    ],
                    [t('logManagement.logSearch.month', {
                      value: '1',
                    })]: [
                      dayjs().subtract(1, 'months'),
                      dayjs(),
                    ],
                    [t(
                      'logManagement.logSearch.default'
                    )]: [
                      dayjs().subtract(15, 'minute'),
                      dayjs(),
                    ],
                  }}
                  disabledDate={onDisabledDate}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </FallbackError>
  );
};
