import { DeleteOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Form, Input, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { REQUIRED_COLOR } from '@/config/color';
import { validation } from '@/utils';

import { useCreateLogDownload } from '../../api/create-log-download';
import { Directory } from '../../types';
import { ExplorerDownloadList } from '../explorer-download-list';

type ExplorerDownloadModalProps = {
  open: boolean;
  files: Directory[];
  onCancel: () => void;
  onSelectChange: (selected: Directory[]) => void;
  onRemoveFile: (fileId: string) => void;
};

export const ExplorerDownloadModal = ({
  open,
  files,
  onCancel,
  onRemoveFile,
  onSelectChange,
}: ExplorerDownloadModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const createLogDownload = useCreateLogDownload({
    onSuccess: () => {
      onSelectChange([]);
      onCancel();
    },
  });

  const onDownload = async () => {
    await form.validateFields();
    const { password } = form.getFieldsValue();

    createLogDownload.submit({
      password,
      files: files.map(
        (file) => `${file.path}/${file.name}`
      ),
    });
  };

  return (
    <>
      <Modal
        centered
        open={open}
        title={
          <IntlMessage id="logManagement.download" />
        }
        okText={
          <IntlMessage id="logManagement.download" />
        }
        okButtonProps={{
          loading: createLogDownload.isLoading,
        }}
        onOk={onDownload}
        onCancel={onCancel}
        afterClose={() => form.resetFields()}
      >
        <Typography.Text strong>File :</Typography.Text>
        {files.map((item) => (
          <Flex
            key={item.id}
            align="center"
            gap="sm"
            style={{ marginBottom: 2, marginLeft: 10 }}
          >
            <Typography.Link key={item.id}>
              {item.name}
            </Typography.Link>

            {files.length !== 1 && (
              <DeleteOutlined
                onClick={() =>
                  onRemoveFile(item.id as string)
                }
                style={{ color: REQUIRED_COLOR }}
              />
            )}
          </Flex>
        ))}
        <Form
          form={form}
          layout="vertical"
          className="mt-3"
        >
          <Form.Item
            name="password"
            label={
              <IntlMessage id="logManagement.password" />
            }
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
            ]}
          >
            <Input
              placeholder={
                t('logManagement.placeholder', {
                  field: t('logManagement.password'),
                }) as string
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <ExplorerDownloadList />
    </>
  );
};
