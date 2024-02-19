import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Form, Input, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { HiOutlineLightBulb } from 'react-icons/hi';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';

import { useCreateWhitelist } from '../../api/create-whitelist';
import { WhitelistLogTypeModal } from '../whitelist-log-type-modal';

type WhitelistCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

const logType = [
  {
    label:
      'ก. ข้อมูลอินเทอร์เน็ตที่เกิดจากการ เข้าถึงระบบเครือข่าย',
    value: 'NETWORK',
  },
  {
    label:
      'ข. ข้อมูลอินเทอร์เน็ตบนเครื่อง ผู้ให้บริการจดหมายอิเล็กทรอนิกส์ (e-mail servers)',
    value: 'MAIL_SERVER',
  },
  {
    label:
      'ค. ข้อมูลอินเทอร์เน็ตจากการโอน แฟ้มข้อมูลบนเครื่องให้บริการโอน แฟ้มข้อมูล',
    value: 'FILE',
  },
  {
    label:
      'ง. ข้อมูลอินเทอร์เน็ตบนเครื่อง ผู้ให้บริการเว็บ',
    value: 'WEB',
  },
  {
    label:
      'จ. ชนิดของข้อมูลบนเครือข่าย คอมพิวเตอร์ขนาดใหญ่ (Usenet)',
    value: 'USENET',
  },
  {
    label:
      'ฉ. ข้อมูลที่เกิดจากการโต้ตอบกันบน เครือข่ายอินเทอร์เน็ต เช่น Internet Relay Chat (IRC) หรือ Instance Messaging (IM) เป็นต้น',
    value: 'MESSAGE',
  },
  {
    label: 'อื่นๆ',
    value: 'OTHER',
  },
];

export const WhitelistCreateModal = ({
  open,
  onCancel,
}: WhitelistCreateModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCreateWhitelist({
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

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit(values);
  };

  return (
    <>
      <Modal
        title={
          <IntlMessage id="logManagement.whitelist.addLogType" />
        }
        open={open}
        okButtonProps={{ loading: isLoading }}
        onOk={onSubmit}
        onCancel={onCancel}
        width={600}
        okText={<IntlMessage id="logManagement.create" />}
        destroyOnClose
        afterClose={() => form.resetFields()}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={
              <IntlMessage id="logManagement.whitelist.hostnameIPAddress" />
            }
            name="target"
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
              validation.trim(),
            ]}
          >
            <Input
              placeholder={
                t('logManagement.placeholder', {
                  field: t(
                    'logManagement.whitelist.hostnameIPAddress'
                  ),
                }) as string
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <Flex
                className="w-100"
                align="center"
                justify="space-between"
              >
                <Typography.Text>
                  <IntlMessage id="logManagement.whitelist.logType" />
                </Typography.Text>

                <span
                  className={css`
                    color: #704aff !important;
                    font-size: 12px;
                    cursor: pointer;
                  `}
                  onClick={toggle.preview}
                >
                  <HiOutlineLightBulb className="mr-1" />
                  <IntlMessage id="logManagement.whitelist.advice" />
                </span>
              </Flex>
            }
            name="type"
            initialValue="NETWORK"
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
            ]}
          >
            <Select
              options={logType}
              placeholder={
                t('logManagement.selectPlaceholder', {
                  field: t(
                    'logManagement.whitelist.logType'
                  ),
                }) as string
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <IntlMessage id="logManagement.description" />
            }
            name="description"
          >
            <Input.TextArea
              rows={4}
              placeholder={
                t('logManagement.placeholder', {
                  field: t('logManagement.description'),
                }) as string
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <WhitelistLogTypeModal
        open={toggle.openPreview}
        onCancel={toggle.preview}
      />
    </>
  );
};
