// import {
//   CommentOutlined,
//   EnterOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import {
  // Avatar,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  // Typography,
} from 'antd';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
// import { Flex } from '@components/flex';

import { useGetRequestMeta } from '../../api/get-request-meta';
import { IdetifyStatus } from '../../types';

type RequestDetailVerificationManageModalDetailProps = {
  form: FormInstance;
  identifyId?: string;
  setSelectVerificationType: (type: string) => void;
};

export const RequestDetailVerificationManageModalDetail =
  ({
    form,
    identifyId,
    setSelectVerificationType,
  }: RequestDetailVerificationManageModalDetailProps) => {
    const { data: meta } = useGetRequestMeta();

    const options = meta?.status?.map(
      (v: IdetifyStatus) => {
        return {
          label: v?.name,
          value: v?.ObjectUUID,
        };
      }
    );
    return (
      <Form form={form} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col {...getColLayout(12)}>
            <Form.Item
              label="ชื่อ"
              name="name"
              rules={[
                validation.required('กรุณากรอก ชื่อ'),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...getColLayout(12)}>
            <Form.Item
              label="ประเภทการตรวจสอบ"
              name="verificationType"
              rules={[
                validation.required(
                  'กรุณาเลือก ประเภทการตรวจสอบ'
                ),
              ]}
            >
              <Select
                onChange={(value) => {
                  setSelectVerificationType(value);
                }}
                options={[
                  {
                    label: 'อีเมล',
                    value: 'email',
                  },
                  {
                    label: 'เอกสาร',
                    value: 'document',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col {...getColLayout(24)}>
            {identifyId ? (
              <Form.Item
                label="สถานะ"
                name="status"
                rules={[
                  validation.required('กรุณาเลือก สถานะ'),
                ]}
              >
                <Select options={options} />
              </Form.Item>
            ) : null}
            <Form.Item
              label="รายละเอียด"
              name="description"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            {/* <Typography.Title level={4} className="mt-3">
              <CommentOutlined className="font-size-lg font-weight-bold" />{' '}
              แสดงความคิดเห็น
            </Typography.Title>
            <div className="pl-3 pr-2 pt-3">
              <Flex alignItems="center">
                <Avatar
                  className="mr-2"
                  icon={<UserOutlined />}
                />
                <div
                  className="p-2"
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: 8,
                    width: '90%',
                  }}
                >
                  <Input
                    placeholder="แสดงความคิดเห็น"
                    suffix={<EnterOutlined />}
                  />
                </div>
              </Flex>
            </div> */}
          </Col>
        </Row>
      </Form>
    );
  };
