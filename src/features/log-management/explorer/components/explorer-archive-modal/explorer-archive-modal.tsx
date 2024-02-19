import {
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

import { Directory } from '../../types';

type ExplorerArchiveModalProps = {
  open: boolean;
  form: FormInstance;
  data?: Directory;
  loading?: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
};

export const ExplorerArchiveModal = ({
  data,
  form,
  loading,
  onSubmit,
  ...rest
}: ExplorerArchiveModalProps) => {
  const { t } = useTranslation();

  const archiveDateOptions = [
    {
      label: (
        <IntlMessage
          id="logManagement.explorer.archiveDateOption"
          options={{ value: '1' }}
        />
      ),
      value: 365,
    },
    {
      label: (
        <IntlMessage
          id="logManagement.explorer.archiveDateOption"
          options={{ value: '2' }}
        />
      ),
      value: 730,
    },
  ];

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.explorer.archive" />
      }
      width={600}
      destroyOnClose
      {...rest}
      okButtonProps={{ loading }}
      onOk={onSubmit}
      okText={<IntlMessage id="logManagement.update" />}
      cancelText={
        <IntlMessage id="logManagement.cancel" />
      }
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="logManagement.explorer.path" />
          }
        >
          <Typography.Text>
            {data?.label ?? '-'}
          </Typography.Text>
        </Form.Item>
        <Form.Item
          name="note"
          label={
            <IntlMessage id="logManagement.explorer.reason" />
          }
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Input.TextArea
            rows={3}
            placeholder={
              t('logManagement.placeholder', {
                field: t('logManagement.explorer.reason'),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          name="archive"
          label={
            <IntlMessage id="logManagement.explorer.archiveDate" />
          }
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            options={archiveDateOptions}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'logManagement.explorer.archiveDate'
                ),
              }) as string
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
