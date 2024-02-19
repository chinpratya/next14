import {
  Cascader,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { useEffect } from 'react';

import {
  GREEN_PRIMARY_COLOR,
  RED_PRIMARY_COLOR,
} from '@/config/color';
import { useNotifications } from '@/stores/notifications';
import { getColLayout, validation } from '@/utils';
import { Modal } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetRequest } from '../../api/get-request';
import { useGetRequestMeta } from '../../api/get-request-meta';
import { useUpdateRequestStatus } from '../../api/update-request-status';

export type RequestChangeStatusProps = {
  open: boolean;
  onClose: () => void;
  requestId: string;
};

export const RequestChangeStatus = ({
  open,
  onClose,
  requestId,
}: RequestChangeStatusProps) => {
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const { data: requestDetail, ...request } =
    useGetRequest(requestId);

  const { data: requestMeta, ...meta } =
    useGetRequestMeta();

  const updateRequestStatus = useUpdateRequestStatus({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'เปลี่ยนสถานะคำขอสำเร็จ',
      });
      onClose();
    },
  });

  const statusOptions = requestMeta?.status?.map(
    (status) => ({
      label: (
        <ShowTagStatus
          bordered={false}
          status={status.ObjectUUID}
          items={[
            {
              key: 'Close',
              label: 'Close',
              color: GREEN_PRIMARY_COLOR,
            },
            {
              key: 'Reject',
              label: 'Reject',
              color: RED_PRIMARY_COLOR,
            },
          ]}
        />
      ),
      value: status.ObjectUUID,
    })
  );

  const reasonOptions = requestMeta?.reasonForStatus?.map(
    (reason) => ({
      label: reason.name,
      value: reason.ObjectUUID,
      children: reason?.reason?.map((reason) => ({
        label: reason.name,
        value: reason.ObjectUUID,
      })),
    })
  );

  const onChangeStatus = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateRequestStatus.submit({
      status: values?.status,
      reason: values?.reason?.[1] ?? '',
      massage: values?.massage ?? '',
    });
  };

  const isEditenable = ['close', 'reject'].includes(
    requestDetail?.requestStatus?.toLowerCase() as string
  );

  useEffect(() => {
    if (isEditenable) {
      form.setFieldsValue({
        status: requestDetail?.requestStatus,
        reason: [
          requestDetail?.reason?.split('/')[0],
          requestDetail?.reason,
        ],
        massage: requestDetail?.massage,
      });
    }
  }, [form, isEditenable, requestDetail, open]);

  return (
    <Modal
      title="เปลี่ยนสถานะคำขอ"
      open={open}
      onCancel={onClose}
      loading={request.isLoading || meta.isLoading}
      afterClose={() => form.resetFields()}
      onOk={onChangeStatus}
      okButtonProps={{
        hidden: isEditenable,
        loading: updateRequestStatus.isLoading,
      }}
    >
      <FallbackError
        isError={request.isError || meta.isError}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={[24, 12]}>
            <Col {...getColLayout(8)}>
              <Form.Item
                label="สถานะ"
                name="status"
                rules={[
                  validation.required('กรุณาเลือกสถานะ'),
                ]}
              >
                <Select
                  disabled={isEditenable}
                  options={statusOptions}
                />
              </Form.Item>
            </Col>
            <Col {...getColLayout(16)}>
              <Form.Item
                label="ระบุเหตุผลในการเปลี่ยนสถานะ"
                name="reason"
                rules={[
                  validation.required(
                    'กรุณาระบุเหตุผลในการเปลี่ยนสถานะ'
                  ),
                ]}
              >
                <Cascader
                  disabled={isEditenable}
                  options={reasonOptions}
                />
              </Form.Item>
            </Col>
            <Col {...getColLayout(24)}>
              <Form.Item
                label="แจ้งรายละเอียดเพิ่มเติมให้กับเจ้าของข้อมูล"
                name="massage"
              >
                <Input.TextArea
                  disabled={isEditenable}
                  rows={5}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FallbackError>
    </Modal>
  );
};
