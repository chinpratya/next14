import { css } from '@emotion/css';
import { Form, Input, Select, Tag } from 'antd';
import { useState, useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useUpdateRequestStatus } from '../../api/update-request-status';
import { RequestDetail } from '../../types';

type RequestDetailChangeStatusModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
  data?: RequestDetail;
};

export const RequestDetailChangeStatusModal = ({
  open,
  onCancel,
  requestId,
  data,
}: RequestDetailChangeStatusModalProps) => {
  const [form] = Form.useForm();
  const [selectedStatus, setSelectedStatus] =
    useState('');
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useUpdateRequestStatus({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update status success',
      });
      onCancel();
    },
  });
  const statusItem = [
    {
      label: 'เปิด',
      value: 'opened',
      key: 'opened',
      color: 'success',
    },
    {
      label: 'กำลังดำเนินงาน',
      value: 'pending',
      key: 'pending',
      color: 'warning',
    },
    {
      label: 'เสร็จสิ้น',
      value: 'closed',
      key: 'closed',
      color: '#8BC926',
    },
  ];
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onSubmit = async () => {
    const payload = {
      ...form.getFieldsValue(),
      massage: form.getFieldValue('massage')
        ? form.getFieldValue('massage')
        : '',
    };
    console.log('onSubmit', payload);
    submit(payload);
  };
  return (
    <Modal
      title={
        <>
          เปลี่ยนสถานะ
          <span
            className={css`
              color: #72849a;
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
              margin-right: 10px;
            `}
          >
            {'7b1ace72-54ca-4dcd-8ad7-b55ac6318d74'}
          </span>
        </>
      }
      open={open}
      onCancel={onCancel}
      okButtonProps={{ loading: isLoading }}
      onOk={onSubmit}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="เปลี่ยนสถานะ" name="status">
          <Select
            onChange={(value) => setSelectedStatus(value)}
          >
            {statusItem.map((status) => (
              <Select.Option
                key={status.key}
                value={status.value}
              >
                <Tag color={status.color}>
                  {status.label}
                </Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {selectedStatus === 'closed' && (
          <Form.Item label="ข้อความ" name="massage">
            <Input.TextArea rows={5} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
