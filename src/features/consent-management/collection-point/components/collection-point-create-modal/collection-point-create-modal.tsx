import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TagsCreateModal,
  TagsSelect,
  useListActivity,
} from '@/features/data-mapping';
import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateCollectionPoint } from '../../api/create-collections-point';
import { useGetCollectionPointMeta } from '../../api/get-collection-point-meta';
import { useListCollectionPointPolicy } from '../../api/list-collection-point-policy';
import { CollectionPointPolicyInclude } from '../collection-point-policy-include';

export type CollectionPointCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

export const CollectionPointCreateModal = ({
  open,
  onClose,
}: CollectionPointCreateModalProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data: policyList } =
    useListCollectionPointPolicy();

  const { data: activity } = useListActivity({
    consent: true,
  });

  const activityOptions = activity?.data?.map(
    (value) => ({
      value: value.ObjectUUID,
      label: value.name,
    })
  );

  const { data: meta } = useGetCollectionPointMeta();

  const templateOptions = meta?.template?.map(
    (value) => ({
      value: value.ObjectUUID,
      label: value.name,
    })
  );

  const update = useCreateCollectionPoint({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'consentManagement.notification.collectionPoint.create'
        ) as string,
      });
      onClose();
    },
  });

  const handleSave = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const policy = policyList?.find(
      (item) => item.ObjectUUID === values.policyId
    );
    const policyName = policy?.name;
    const policyLink = `https://api.onefence.co/policy/v1/policy/html/${policy?.ObjectUUID}`;
    const policyVersion = policy?.version;

    update.submit({
      policyName: policyName ?? '',
      policyLink: policyLink ?? '',
      policyVersion: policyVersion ?? '',
      policyId: policy?.ObjectUUID ?? '',
      ...form.getFieldsValue(),
      policyShow: true,
    });
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title={
        <IntlMessage id="consentManagement.collectionPoint.create.title" />
      }
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okButtonProps={{
        loading: update.isLoading,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        onValuesChange={(changedValues) => {
          if (changedValues.policyId) {
            const policy = policyList?.find(
              (item) =>
                item.ObjectUUID === changedValues.policyId
            );
            form.setFieldsValue({
              policyName: policy?.name,
              policyLink: `https://api.onefence.co/policy/v1/policy/html/${policy?.ObjectUUID}`,
              policyVersion: policy?.version,
            });
          }
        }}
      >
        <Form.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.basicInfo.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'consentManagement.collectionPoint.basicInfo.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.basicInfo.description" />
          }
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.basicInfo.type" />
          }
          name="template"
          rules={[
            validation.required(
              t(
                'consentManagement.collectionPoint.basicInfo.typeRequired'
              )
            ),
          ]}
        >
          <Select options={templateOptions} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.basicInfo.activity" />
          }
          name="activityID"
          rules={[
            validation.required(
              t(
                'consentManagement.collectionPoint.basicInfo.activityRequired'
              )
            ),
          ]}
        >
          <Select options={activityOptions} />
        </Form.Item>
        <Form.Item
          name="tagID"
          label={
            <Flex
              alignItems="center"
              justifyContent="between"
              className="w-100"
            >
              <Typography.Text>
                <IntlMessage id="consentManagement.tags.title" />
              </Typography.Text>
              <Typography.Link
                className="font-weight-normal"
                onClick={toggle.create}
              >
                <PlusOutlined />{' '}
                <IntlMessage id="consentManagement.tags.create" />
              </Typography.Link>
            </Flex>
          }
        >
          <TagsSelect />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.basicInfo.identifier" />
          }
          name="identifier"
          rules={[
            validation.required(
              t(
                'consentManagement.collectionPoint.basicInfo.identifierRequired'
              )
            ),
          ]}
        >
          <Select
            options={[
              {
                label: (
                  <IntlMessage id="consentManagement.collectionPoint.email" />
                ),
                value: 'email',
              },
              {
                label: (
                  <IntlMessage id="consentManagement.collectionPoint.tel" />
                ),
                value: 'callNumber',
              },
              {
                label: (
                  <IntlMessage id="consentManagement.collectionPoint.national" />
                ),
                value: 'national-id',
              },
              {
                label: (
                  <IntlMessage id="consentManagement.collectionPoint.other" />
                ),
                value: 'other',
              },
            ]}
          />
        </Form.Item>
        <CollectionPointPolicyInclude />
      </Form>
      <TagsCreateModal
        open={toggle.openCreate}
        onClose={toggle.create}
      />
    </Modal>
  );
};
