import { Flex } from '@mantine/core';
import { Button, Form } from 'antd';
import type { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useScanCookie } from '../../../cookies';
import { useCreateDomain } from '../../api/create-domain';
import { DomainSettingForm } from '../domain-setting-form';

export type DomainCreateModalProps = {
  open?: boolean;
  onClose?: () => void;
  onWizard?: (domainId: string) => void;
};

export const DomainCreateModal = ({
  open,
  onClose,
  onWizard,
}: DomainCreateModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [isWizard, setWizard] = useState(false);

  const { submit: scanCookie } = useScanCookie({});

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const { submit, isLoading } = useCreateDomain({
    onSuccess: (domainId) => {
      onClose?.();
      scanCookie(domainId);
      showNotification({
        message: t(
          tokens.cookieManagement.notification
            .addedWebsiteSuccess
        ),
        type: 'success',
      });
      if (isWizard) {
        onWizard?.(domainId);
      }
    },
  });

  const handleFinish = async (isWizard: boolean) => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      if (isWizard) {
        setWizard(true);
      }
      submit(values);
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateErrorEntity<unknown>
      );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage
          id={
            tokens.cookieManagement.modalAddWebsite.title
          }
        />
      }
      afterClose={() => {
        form.resetFields();
        setWizard(false);
      }}
      footer={
        <Flex justify="end" align="center" gap={2}>
          <Button onClick={onClose}>
            <IntlMessage id={tokens.common.cancel} />
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() => handleFinish(false)}
            loading={isLoading && !isWizard}
          >
            <IntlMessage
              id={
                tokens.cookieManagement.modalAddWebsite
                  .addAndScan
              }
            />
          </Button>
          <Button
            type="primary"
            onClick={() => handleFinish(true)}
            loading={isLoading && isWizard}
          >
            <IntlMessage
              id={
                tokens.cookieManagement.modalAddWebsite
                  .addAndWizard
              }
            />
          </Button>
        </Flex>
      }
      width={800}
    >
      <Form
        form={form}
        initialValues={{
          limit_scan: 100,
        }}
      >
        <DomainSettingForm />
      </Form>
    </Modal>
  );
};
