import {
  Button,
  Form,
  Input,
  Select,
  Skeleton,
} from 'antd';
import { useState, useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { ShowTagStatus } from '@components/show-tag-status';

import { useGetTaskMeta } from '../../api/get-task-meta';
import { useUpdateTaskStatus } from '../../api/update-task-status';
import { TaskDetail } from '../../types';

export type TaskDetailChangeStatusProps = {
  workId: string;
  data?: TaskDetail;
  onClose?: () => void;
};

export const TaskDetailChangeStatus = ({
  workId,
  data,
  onClose,
}: TaskDetailChangeStatusProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const [selectedStatus, setSelectedStatus] =
    useState('');

  const { data: meta, isLoading } = useGetTaskMeta();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const statusOptions = meta?.status.map((value) => ({
    value: value.ObjectUUID,
    label: <ShowTagStatus status={value.ObjectUUID} />,
  }));

  // const solutionOptions = meta?.solution.map((value) => ({
  //   value: value.ObjectUUID,
  //   label: value.name,
  // }));

  const updateStatus = useUpdateTaskStatus({
    workId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update status success',
      });
      onClose?.();
    },
  });

  const handlerUpdateStatus = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateStatus.submit(values);
  };
  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="เปลี่ยนสถานะ"
        name="status"
        rules={[validation.required('กรุณาเลือก สถานะ')]}
      >
        <Select
          options={statusOptions}
          onChange={(value) => setSelectedStatus(value)}
        />
      </Form.Item>
      {selectedStatus === 'complete' && (
        <>
          <Form.Item
            label="เหตุผลงาน"
            name="solution"
            rules={[
              validation.required('กรุณาเลือก สถานะ'),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="แสดงความคิดเห็น"
            name="comment"
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Flex justifyContent="end">
            <Button
              type="primary"
              onClick={handlerUpdateStatus}
              loading={updateStatus.isLoading}
            >
              Save
            </Button>
          </Flex>
        </>
      )}
    </Form>
  );
};
