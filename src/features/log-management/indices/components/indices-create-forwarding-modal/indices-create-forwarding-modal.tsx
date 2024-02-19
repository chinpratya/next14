import { CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Form, Steps, Typography } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useCreateLogForwarding } from '../../api/create-log-forwarding';

import { AddFilterForm } from './add-filter-form';
import { ConfigCertificateForm } from './config-certificate-form';
import { ConfigTargetServerForm } from './config-target-server-form';
import { stepOptions } from './forwarding-options';

type IndicesCreateForwardingModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const IndicesCreateForwardingModal = ({
  open,
  onCancel,
}: IndicesCreateForwardingModalProps) => {
  const [form] = Form.useForm();
  const { query } = useRouter();
  const { showNotification } = useNotifications();

  const [data, setData] =
    useState<Record<string, unknown>>();
  const [step, setStep] = useState(1);

  const createForwarding = useCreateLogForwarding({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.created'
        ) as string,
      });
      onCancel();
    },
  });

  const protocol = Form.useWatch('protocol', form);
  const isConfigCertificate =
    data?.protocol === 'ssl-tcp';

  const onNext = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    setData((prev) => ({ ...prev, ...values }));
    setStep((prev) => prev + 1);
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const filter = values.filter;
    const severity = values.filter.severity ?? [];
    const facility = values.filter.facility ?? [];

    createForwarding.submit({
      ...data,
      ...values,
      filter: {
        ...filter,
        severity: severity.includes(-1) ? [] : severity,
        facility: facility.includes(-1) ? [] : facility,
      },
      indices: query.indiceId,
    });
  };

  const affterClose = () => {
    setStep(1);
    setData(undefined);
    form.resetFields();
  };

  useEffect(() => {
    const element = document.querySelector(
      '.ant-modal-body'
    );
    if (element) element.scroll(0, 0);
  }, [step]);

  useEffect(() => {
    if (protocol)
      setData((prev) => ({ ...prev, protocol }));
  }, [protocol]);

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.indices.createLogForwarding" />
      }
      bodyStyle={{ height: '80vh', maxHeight: 900 }}
      open={open}
      onOk={
        step === 1 || (step === 2 && isConfigCertificate)
          ? onNext
          : onSubmit
      }
      onCancel={onCancel}
      destroyOnClose
      centered
      maskClosable={false}
      width={650}
      closeIcon={<CloseOutlined onClick={onCancel} />}
      okText={
        step === 1 ||
        (step === 2 && isConfigCertificate) ? (
          <IntlMessage id="logManagement.next" />
        ) : (
          <IntlMessage id="logManagement.create" />
        )
      }
      cancelText={
        step === 1 ? (
          <IntlMessage id="logManagement.cancel" />
        ) : (
          <IntlMessage id="logManagement.back" />
        )
      }
      cancelButtonProps={{
        onClick: step === 1 ? onCancel : onBack,
      }}
      okButtonProps={{
        loading: createForwarding.isLoading,
      }}
      afterClose={affterClose}
    >
      <Form form={form} layout="vertical">
        <Steps
          className={css`
            margin: ${!isConfigCertificate
              ? '0 auto'
              : 'unset'};
            max-width: ${!isConfigCertificate
              ? '400px'
              : 'auto'};
          `}
          current={step - 1}
          items={
            isConfigCertificate
              ? stepOptions.isCertificate.map(
                  (item, index) => ({
                    title: (
                      <IntlMessage
                        id={item.title}
                        options={{ step: index + 1 }}
                      />
                    ),
                    description: (
                      <IntlMessage
                        id={item.description}
                      />
                    ),
                  })
                )
              : stepOptions.noneCertificate.map(
                  (item, index) => ({
                    title: (
                      <IntlMessage
                        id={item.title}
                        options={{ step: index + 1 }}
                      />
                    ),
                    description: (
                      <IntlMessage
                        id={item.description}
                      />
                    ),
                  })
                )
          }
        />

        <Typography.Title
          level={4}
          className="text-center font-weight-bold my-3"
        >
          {step === 1 ? (
            <IntlMessage id="logManagement.indices.forwarding.setting" />
          ) : step === 2 && isConfigCertificate ? (
            <IntlMessage id="logManagement.indices.certificate" />
          ) : (
            <IntlMessage id="logManagement.indices.forwarding.setupFilter" />
          )}
        </Typography.Title>

        {step === 1 ? (
          <ConfigTargetServerForm />
        ) : step === 2 ? (
          <>
            {isConfigCertificate ? (
              <ConfigCertificateForm form={form} />
            ) : (
              <AddFilterForm form={form} />
            )}
          </>
        ) : (
          <AddFilterForm form={form} />
        )}
      </Form>
    </Modal>
  );
};
