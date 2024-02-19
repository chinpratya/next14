import {
  Collapse,
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useListLogSearchHost } from '@/features/log-management';

import {
  facilityOptions,
  severityOptions,
} from './forwarding-options';

type AddFilterFormProps = {
  form: FormInstance;
  collapse?: boolean;
};

export const AddFilterForm = ({
  form,
  collapse = true,
}: AddFilterFormProps) => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const host = useListLogSearchHost({
    type: 'indices',
    value: query?.indiceId as string,
    module: 'LM',
    response_type: 'lists',
  });

  const onSelectSeverity = (value: number[]) => {
    if (value[value.length - 1] < 0) {
      form.setFieldValue(['filter', 'severity'], [-1]);
    } else if (value.length > 1 && value.includes(-1)) {
      form.setFieldValue(
        ['filter', 'severity'],
        value.filter((item) => item !== -1)
      );
    }
  };

  const onSelectFacility = (value: number[]) => {
    if (value[value.length - 1] < 0) {
      form.setFieldValue(['filter', 'facility'], [-1]);
    } else if (value.length > 1 && value.includes(-1)) {
      form.setFieldValue(
        ['filter', 'facility'],
        value.filter((item) => item !== -1)
      );
    }
  };

  const FormValue = () => {
    return (
      <>
        <Form.Item
          name={['filter', 'host']}
          label={
            <IntlMessage id="logManagement.indices.forwarding.hostOrIp" />
          }
          initialValue=""
        >
          <Select
            options={[
              {
                label: (
                  <IntlMessage id="logManagement.all" />
                ),
                value: '',
              },
              ...(host.data?.data ?? []),
            ]}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'logManagement.indices.forwarding.hostOrIp'
                ),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          name={['filter', 'severity']}
          label={
            <IntlMessage id="logManagement.indices.forwarding.severity" />
          }
          initialValue={[-1]}
        >
          <Select
            mode="multiple"
            showSearch={false}
            onChange={onSelectSeverity}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'logManagement.indices.forwarding.severity'
                ),
              }) as string
            }
            options={[
              {
                label: (
                  <IntlMessage id="logManagement.all" />
                ),
                value: -1,
              },
              ...severityOptions,
            ]}
          />
        </Form.Item>
        <Form.Item
          name={['filter', 'facility']}
          label={
            <IntlMessage id="logManagement.indices.forwarding.facility" />
          }
          initialValue={[-1]}
        >
          <Select
            mode="multiple"
            showSearch={false}
            onChange={onSelectFacility}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'logManagement.indices.forwarding.facility'
                ),
              }) as string
            }
            options={[
              {
                label: (
                  <IntlMessage id="logManagement.all" />
                ),
                value: -1,
              },
              ...facilityOptions,
            ]}
          />
        </Form.Item>
        <Form.Item
          tooltip="รอข้อมูลจากพี่ต้น"
          name={['filter', 'message']}
          label={
            <IntlMessage id="logManagement.indices.forwarding.message" />
          }
        >
          <Input.TextArea
            rows={3}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'logManagement.indices.forwarding.message'
                ),
              }) as string
            }
          />
        </Form.Item>
      </>
    );
  };

  return (
    <>
      {collapse ? (
        <Collapse activeKey="condition">
          <Collapse.Panel
            header={
              <Typography.Text strong>
                <IntlMessage id="logManagement.indices.forwarding.condition" />
              </Typography.Text>
            }
            key="condition"
            showArrow={false}
          >
            <FormValue />
          </Collapse.Panel>
        </Collapse>
      ) : (
        <FormValue />
      )}
    </>
  );
};
