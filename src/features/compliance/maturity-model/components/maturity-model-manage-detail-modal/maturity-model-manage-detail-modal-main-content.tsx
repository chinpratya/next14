import { Col, Empty, Form, Input, Row } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';

import { IconSelector } from '../../../share';
import { MaturityModelDetail } from '../../types';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type MaturityModelManageDetailModalMainContentProps =
  {
    maturityModel?: MaturityModelDetail;
    onChange?: (
      maturityModel: Record<string, unknown>
    ) => void;
  };

export const MaturityModelManageDetailModalMainContent =
  ({
    maturityModel,
    onChange,
  }: MaturityModelManageDetailModalMainContentProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (maturityModel) {
        form.setFieldsValue(maturityModel);
      }
    }, [maturityModel, form]);

    if (!maturityModel) return <Empty />;

    return (
      <div onMouseLeave={() => form.submit()}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onChange}
        >
          <Form.Item
            label="เพิ่มไอคอน"
            name="icon"
            rules={[
              validation.required('กรุณาเลือกไอคอน'),
            ]}
          >
            <IconSelector />
          </Form.Item>
          <Row gutter={[24, 0]}>
            <Col {...getColLayout(12)}>
              <Form.Item
                label="ชื่อคอลัมน์"
                name="columnName"
                rules={[
                  validation.required(
                    'กรุณากรอกชื่อคอลัมน์'
                  ),
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...getColLayout(12)}>
              <Form.Item
                label="คำอธิบายคอลัมน์"
                name="columnDetail"
                rules={[
                  validation.required(
                    'กรุณากรอกคำอธิบายคอลัมน์'
                  ),
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...getColLayout(24)}>
              <Form.Item
                label="รายละเอียด"
                name="description"
              >
                <CkEditor />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
