import { css } from '@emotion/css';
import { Form, Input, Modal, Select, Tag } from 'antd';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useListUser } from '@/features/admin';
import { useSearch } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';

import { statusItems } from '../../../shared/constant/incident';
import { useUpdateIncident } from '../../api/update-incident';
import { IncidentInfo } from '../../types';

type IncidentSiemActionModalProps = {
  incident?: IncidentInfo;
  open: boolean;
  onClose: () => void;
};

type Option = {
  label: string;
  value: string;
};

export const IncidentSiemActionModal = ({
  incident,
  open,
  onClose,
}: IncidentSiemActionModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const [user, setUser] = useState<Option[]>([]);

  const listUser = useListUser({
    search: debouncedSearch,
  });

  const updateIncident = useUpdateIncident({
    incidentId: incident?.id as string,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      onClose();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const payload = {
      assign_status: values.assign_status,
      assignes: [
        {
          _id: values.assignee.value,
          email: values.assignee.label,
        },
      ],
      description: values.description,
    };
    updateIncident.submit(payload);
  };

  useEffect(() => {
    if (listUser.data) {
      setUser(
        listUser.data.data?.map(({ email, userId }) => ({
          label: email,
          value: userId,
        }))
      );
    }
  }, [listUser.data]);

  return (
    <Modal
      title={
        <IntlMessage id="siem.incidentManagementDetails.siemAction" />
      }
      open={open}
      onCancel={onClose}
      onOk={onSubmit}
      okButtonProps={{
        loading: updateIncident.isLoading,
      }}
      okText={<IntlMessage id="logManagement.update" />}
      cancelText={
        <IntlMessage id="logManagement.cancel" />
      }
      afterClose={() => form.resetFields()}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          assignee: {
            label: incident?.assignes?.[0].email,
            value: incident?.assignes?.[0]._id,
          },
          assign_status: incident?.assign_status,
          description: incident?.description,
        }}
      >
        <Form.Item
          name="assignee"
          label={
            <IntlMessage id="siem.incidentManagementDetails.siemActionAssignee" />
          }
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            labelInValue
            showSearch
            onSearch={onSearch}
            loading={listUser.isLoading}
            filterOption={false}
            options={user}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'siem.incidentManagementDetails.siemActionAssignee'
                ),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          name="assign_status"
          label={
            <IntlMessage id="siem.incidentManagementDetails.siemActionStatus" />
          }
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            className={css`
              .ant-tag {
                width: 30%;
                margin: 5px 0;
              }
            `}
            options={statusItems.map((item) => ({
              label: (
                <Tag
                  className={css`
                    padding: 1px 5px;
                    text-align: center;
                    background: ${`${item.color}10`};
                    color: ${item.color};
                    border: 1px solid ${item.color};
                    min-width: 150px;

                    .ant-typography {
                      color: ${item.color};
                    }
                  `}
                >
                  <IntlMessage id={item.label} />
                </Tag>
              ),
              value: item.key,
            }))}
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.siemActionDescription" />
          }
          name="description"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Input.TextArea
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.incidentManagementDetails.siemActionDescription'
                ),
              }) as string
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
