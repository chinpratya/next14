import {
  Descriptions,
  Form,
  Tabs,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/share-components/modal';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateDataElement } from '../../api/update-data-element';
import { DataElement } from '../../types';
import { ElementsForm } from '../elements-form';

type ElementsEditModalProps = {
  open: boolean;
  element?: DataElement;
  onCancel: () => void;
};

export const ElementsEditModal = ({
  open,
  element,
  onCancel,
}: ElementsEditModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { isLoading, submit } = useUpdateDataElement({
    dataElementId: element?.dataElementID as string,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.dataElement.update'
        ) as string,
      });
      onCancel();
    },
  });
  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:elements:update'],
    ],
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit({
      ...values,
      dataElementID: element?.dataElementID,
    });
  };

  useEffect(() => {
    if (element) form.setFieldsValue(element);
  }, [element, form]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      title={
        <>
          <IntlMessage id="dataMapping.dataElement.edit.title" />{' '}
          <Typography.Text type="secondary">
            {element?.name}
          </Typography.Text>
        </>
      }
      width={650}
      afterClose={() => form.resetFields()}
      okButtonProps={{
        loading: isLoading,
        disabled: !editPermission.isAllow,
      }}
    >
      <Tabs
        items={[
          {
            label: (
              <IntlMessage id="dataMapping.dataElement.detail" />
            ),
            key: 'detail',
            children: (
              <Descriptions
                column={2}
                layout="vertical"
                labelStyle={{ fontWeight: 'bold' }}
              >
                <Descriptions.Item
                  label={
                    <IntlMessage id="dataMapping.dataElement.createdDt" />
                  }
                >
                  <ShowTagDate
                    date={element?.created_dt as string}
                  />
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <IntlMessage id="dataMapping.dataElement.createdBy" />
                  }
                >
                  {element?.created_by}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <IntlMessage id="dataMapping.dataElement.updatedDt" />
                  }
                >
                  <ShowTagDate
                    date={element?.updated_dt as string}
                  />
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <IntlMessage id="dataMapping.dataElement.updatedBy" />
                  }
                >
                  {element?.updated_by ?? '-'}
                </Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            label: (
              <IntlMessage id="dataMapping.dataElement.basicInfo" />
            ),
            key: 'basic-info',
            children: <ElementsForm form={form} />,
          },
        ]}
      />
    </Modal>
  );
};
