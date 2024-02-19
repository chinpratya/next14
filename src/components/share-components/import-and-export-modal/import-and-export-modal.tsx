import {
  DeleteOutlined,
  DownloadOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Divider,
  Table,
  Timeline,
  Typography,
  Upload,
  Form,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RcFile } from 'antd/lib/upload';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useColumnFiltered } from '@/hooks';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

const { Title } = Typography;

export type ImportAndExportModalProps = {
  open: boolean;
  onToggle: () => void;
  columns: ColumnsType<Record<string, unknown>>;
  isLoading?: boolean;
  onUploadFile: (datafile: RcFile) => void;
  onDownloadFile?: () => void;
  dataSource: Array<Record<string, unknown>>;
  rowKey?: string;
};

export const ImportAndExportModal = ({
  open,
  onToggle,
  isLoading,
  columns,
  dataSource,
  onDownloadFile,
  onUploadFile,
  rowKey = 'key',
}: ImportAndExportModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [file, setFile] = useState<RcFile | null>();

  const onHandleSubmit = async () => {
    await form.validateFields();
    if (file) {
      onUploadFile(file);
      form.resetFields();
    }
  };
  const beforeUpload = (file: RcFile) => {
    setFile(file);
    return true;
  };

  const { xScroll } = useColumnFiltered({
    columns,
  });

  return (
    <Modal
      title={
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.import.title" />
      }
      open={open}
      onCancel={() => onToggle()}
      onOk={form.submit}
      okButtonProps={{
        loading: isLoading,
      }}
      afterClose={() => {
        form.resetFields();
        setFile(null);
      }}
    >
      <div
        className={css`
          .ant-timeline-item {
            position: relative;
            padding-bottom: 1px;
          }
        `}
      >
        <Timeline>
          <Timeline.Item color="blue">
            <Title level={4}>
              <IntlMessage id="compliance.organization.detail.branch.listRespondents.import.one" />
            </Title>
            <Button onClick={onDownloadFile}>
              <DownloadOutlined />{' '}
              <IntlMessage id="compliance.organization.detail.branch.listRespondents.import.one.download" />
            </Button>
            <Divider />
          </Timeline.Item>
          <Timeline.Item color="orange">
            <Title level={4}>
              <IntlMessage id="compliance.organization.detail.branch.listRespondents.import.two" />
            </Title>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered={true}
              pagination={false}
              rowKey={rowKey}
              tableLayout="fixed"
              scroll={{ x: xScroll }}
            />
            <Divider />
          </Timeline.Item>
          <Timeline.Item color="green">
            <Title level={4}>
              <IntlMessage id="compliance.organization.detail.branch.listRespondents.import.three" />
            </Title>
            <Form onFinish={onHandleSubmit} form={form}>
              <Form.Item
                name={'csv'}
                rules={[
                  validation.required(
                    t(
                      'compliance.organization.detail.branch.listRespondents.import.threeRequired'
                    )
                  ),
                ]}
                className="mb-2"
              >
                <Upload
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  <Button>
                    <PaperClipOutlined />{' '}
                    <IntlMessage id="compliance.organization.detail.branch.listRespondents.import.three.attach" />
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                {file && (
                  <Flex
                    align="center"
                    justify="space-between"
                    className={css`
                      padding: 8px 12px;
                      border-radius: 8px;
                      cursor: pointer;
                      border: 1px solid #ededed;

                      :hover {
                        background-color: #e1e3e6;
                      }
                    `}
                    gap={12}
                  >
                    <Typography.Text
                      style={{
                        display: 'inline-block',
                        minWidth: '150px',
                      }}
                    >
                      {file.name}
                    </Typography.Text>
                    <DeleteOutlined
                      className="ml-2 text-danger"
                      onClick={() => setFile(undefined)}
                    />
                  </Flex>
                )}
              </Form.Item>
            </Form>
          </Timeline.Item>
        </Timeline>
      </div>
    </Modal>
  );
};
