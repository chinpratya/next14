import { css } from '@emotion/css';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Space,
  Tooltip,
  TreeSelect,
} from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import validation from '@/utils/validation';

import { useListNotify } from '../../api/list-notify';

type ReportSchedulersSettingFormProps = {
  form: FormInstance;
};

const { SHOW_PARENT } = TreeSelect;

const DISABLED_TEXT_COLOR = CYBER_DISABLED_TEXT_COLOR;

export const ReportSchedulersSettingForm = ({
  form,
}: ReportSchedulersSettingFormProps) => {
  const { t } = useTranslation();

  const listNotify = useListNotify();
  const [notify, setNotify] = useState<
    Omit<DefaultOptionType, 'label'>[]
  >([]);

  useEffect(() => {
    if (listNotify.data) {
      const options = listNotify.data.data.map(
        ({ value, label }) => ({
          key: value,
          value,
          title: label,
        })
      );
      setNotify(options);
    }
  }, [listNotify.data]);

  return (
    <Form
      form={form}
      layout="vertical"
      className={css`
        margin: 24px 0;

        .ant-form-item {
          margin: 0 24px 24px;
        }
      `}
    >
      <Form.Item
        name="name"
        label={
          <IntlMessage id="logManagement.report.scheduler.schedulerName" />
        }
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          validation.trim(),
        ]}
      >
        <Input
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.report.scheduler.schedulerName'
              ),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="logManagement.report.scheduler.exportType" />
        }
      >
        <Button
          disabled
          style={{ color: DISABLED_TEXT_COLOR }}
        >
          PDF
        </Button>
      </Form.Item>
      {/* <Form.Item
        label={
          <IntlMessage id="logManagement.report.scheduler.password" />
        }
      >
        <Input.Password
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.report.scheduler.password'
              ),
            }) as string
          }
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="logManagement.report.scheduler.confirmPassword" />
        }
      >
        <Input.Password
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.report.scheduler.confirmPassword'
              ),
            }) as string
          }
          autoComplete="new-password"
        />
      </Form.Item> */}
      <Divider />

      <Form.Item
        label={
          <IntlMessage id="logManagement.report.scheduler.scheduleTime" />
        }
      >
        <Button
          disabled
          style={{ color: DISABLED_TEXT_COLOR }}
        >
          <IntlMessage id="logManagement.report.scheduler.setting.copy" />
        </Button>
      </Form.Item>
      <Divider />

      <Form.Item
        label={
          <IntlMessage id="logManagement.report.scheduler.recurrencePattern" />
        }
        name="every"
        initialValue="DAILY"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="DAILY">
              <Tooltip
                title="รายงานย้อนหลัง 1 วัน"
                placement="right"
              >
                {t(
                  'logManagement.report.scheduler.daily'
                )}
              </Tooltip>
            </Radio>
            <Radio value="WEEKLY">
              <Tooltip
                title="รายงานย้อนหลัง 1 สัปดาห์ ส่งวันแรกของสัปดาห์"
                placement="right"
              >
                {t(
                  'logManagement.report.scheduler.weekly'
                )}
              </Tooltip>
            </Radio>
            <Radio value="MONTHLY">
              <Tooltip
                title="รายงานย้อนหลัง 1 เดือน ส่งวันแรกของเดือน"
                placement="right"
              >
                {t(
                  'logManagement.report.scheduler.monthly'
                )}
              </Tooltip>
            </Radio>
            <Radio value="QUARTERLY">
              <Tooltip
                title="รายงานย้อนหลัง 1 ไตรมาส ส่งวันแรกของไตรมาส"
                placement="right"
              >
                {t(
                  'logManagement.report.scheduler.quarterly'
                )}
              </Tooltip>
            </Radio>
            <Radio value="YEARLY">
              <Tooltip
                title="รายงานย้อนหลัง 1 ปี ส่งวันแรกของปี"
                placement="right"
              >
                {t(
                  'logManagement.report.scheduler.yearly'
                )}
              </Tooltip>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Divider />

      <Form.Item
        label={
          <IntlMessage id="logManagement.report.scheduler.notification" />
        }
        name="notify"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
        ]}
      >
        <TreeSelect
          treeData={notify}
          treeCheckable
          showCheckedStrategy={SHOW_PARENT}
          loading={listNotify.isLoading}
          placeholder={
            t('logManagement.selectPlaceholder', {
              field: t(
                'logManagement.report.scheduler.notification'
              ),
            }) as string
          }
        />
      </Form.Item>
    </Form>
  );
};
