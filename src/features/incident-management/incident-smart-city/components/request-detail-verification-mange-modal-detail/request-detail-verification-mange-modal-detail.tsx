import { Tabs, Form, Skeleton } from 'antd';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetRequestVerification } from '../../api/get-request-verification';
import { useUpdateRequestVerification } from '../../api/update-request-verification';
import { RequestVerification } from '../../types';

import { RequestDetailVerificationMangeDescription } from './request-detail-verification-mange-description';
import { RequestDetailVerificationMangeDocument } from './request-detail-verification-mange-document';

type RequestDetailVerificationMangeModalDetailProps = {
  open: boolean;
  onClose: () => void;
  requestId: string;
  identifyId?: string;
};

export const RequestDetailVerificationMangeModalDetail =
  ({
    open,
    onClose,
    requestId,
    identifyId,
  }: RequestDetailVerificationMangeModalDetailProps) => {
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const { data, isError, isLoading } =
      useGetRequestVerification({
        requestId,
        identifyId,
      });

    const update = useUpdateRequestVerification({
      requestId,
      identifyId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Update verification successfully.',
        });
        onClose();
      },
    });
    const updateVerification = async () => {
      await form.validateFields();
      const value = form.getFieldsValue();
      update.submit(value);
    };
    return (
      <Modal
        open={open}
        onCancel={onClose}
        title="รายละเอียดการตรวจสอบ"
        onOk={updateVerification}
        okButtonProps={{ loading: update.isLoading }}
      >
        <FallbackError isError={isError}>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              {data?.verificationType !== 'document' ? (
                <RequestDetailVerificationMangeDescription
                  form={form}
                  data={data as RequestVerification}
                />
              ) : (
                <Tabs
                  items={[
                    {
                      label: 'รายละเอียด',
                      key: 'description',
                      children: (
                        <RequestDetailVerificationMangeDescription
                          form={form}
                          data={
                            data as RequestVerification
                          }
                        />
                      ),
                    },
                    {
                      label: 'รายการเอกสารเพิ่มเติม',
                      key: 'document',
                      children: (
                        <RequestDetailVerificationMangeDocument
                          data={
                            data as RequestVerification
                          }
                        />
                      ),
                    },
                  ]}
                />
              )}
            </>
          )}
        </FallbackError>
      </Modal>
    );
  };
