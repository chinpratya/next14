import { Form, Skeleton, Tabs } from 'antd';
import { useEffect, useState } from 'react';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useAddRequestVerification } from '../../api/add-request-verification';
import { useGetRequestVerification } from '../../api/get-request-verification';
import { useUpdateRequestVerification } from '../../api/update-request-verification';
import { RequestDetailVerificationManageModalDetail } from '../request-detail-verification-manage-modal-detail';
import { RequestDetailVerificationManageModalDocument } from '../request-detail-verification-manage-modal-document';

type RequestDetailVerificationManageModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
  identifyId?: string;
};

export const RequestDetailVerificationManageModal = ({
  open,
  onCancel,
  requestId,
  identifyId,
}: RequestDetailVerificationManageModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const [
    selectVerificationType,
    setSelectVerificationType,
  ] = useState('');
  const [activeKey, setActiveKey] = useState('detail');
  const { data, isError, isLoading } =
    useGetRequestVerification({
      requestId,
      identifyId,
    });

  const addVerification = useAddRequestVerification({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Add verification successfully.',
      });
      onCancel();
    },
  });

  const updateVerification = useUpdateRequestVerification(
    {
      requestId,
      identifyId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Update verification successfully.',
        });
        onCancel();
      },
    }
  );

  const handlerVerification = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const document = form.getFieldValue('document');
    const verificationType = form.getFieldValue(
      'verificationType'
    );
    console.log(
      'valid',
      document,
      verificationType,
      activeKey
    );
    if (
      activeKey === 'detail' &&
      document === undefined &&
      verificationType === 'document'
    ) {
      setActiveKey('documents');
    } else {
      switch (identifyId) {
        case undefined:
          addVerification.submit(values);
          break;
        default:
          updateVerification.submit(values);
          break;
      }
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title={
        !identifyId
          ? 'เพิ่มการตรวจสอบ'
          : 'รายละเอียดการตรวจสอบ'
      }
      open={open}
      onCancel={onCancel}
      onOk={handlerVerification}
      okButtonProps={{
        loading:
          addVerification.isLoading ||
          updateVerification.isLoading,
      }}
      afterClose={() => {
        form.resetFields();
        setActiveKey('detail');
        setSelectVerificationType('');
      }}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : selectVerificationType !== 'document' ? (
          <RequestDetailVerificationManageModalDetail
            form={form}
            identifyId={identifyId}
            setSelectVerificationType={
              setSelectVerificationType
            }
          />
        ) : (
          <Tabs
            activeKey={activeKey}
            onChange={(e) => setActiveKey(e)}
            items={[
              {
                label: 'รายละเอียด',
                key: 'detail',
                children: (
                  <RequestDetailVerificationManageModalDetail
                    form={form}
                    identifyId={identifyId}
                    setSelectVerificationType={
                      setSelectVerificationType
                    }
                  />
                ),
              },
              {
                label: 'รายการเอกสารเพิ่มเติม',
                key: 'documents',
                children: (
                  <RequestDetailVerificationManageModalDocument
                    form={form}
                  />
                ),
              },
            ]}
          />
        )}
      </FallbackError>
    </Modal>
  );
};
