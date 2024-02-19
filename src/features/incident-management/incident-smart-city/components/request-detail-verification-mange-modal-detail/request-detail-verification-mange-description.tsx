import {
  Descriptions,
  FormInstance,
  Form,
  Select,
} from 'antd';
import { useEffect } from 'react';

import validation from '@/utils/validation';

import { RequestVerification } from '../../types';

type RequestDetailVerificationMangeDescriptionProps = {
  form: FormInstance;
  data: RequestVerification;
};
export const RequestDetailVerificationMangeDescription =
  ({
    form,
    data,
  }: RequestDetailVerificationMangeDescriptionProps) => {
    useEffect(() => {
      if (data && data.status) {
        form.setFieldsValue({
          ...data,
        });
      }
    }, [data, form]);

    return (
      <Descriptions
        labelStyle={{ fontWeight: 'bold' }}
        layout="vertical"
        column={{
          xs: 2,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
      >
        <Descriptions.Item label="ชื่อ">
          {data?.name && data?.name !== ''
            ? data?.name
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="ประเภทการตรวจสอบ">
          {data?.verificationType &&
          data?.verificationType !== ''
            ? data?.verificationType
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="สถานะ">
          <Form form={form}>
            <Form.Item
              name="status"
              rules={[
                validation.required('กรุรากรอกสถานะ'),
              ]}
            >
              <Select
                style={{ width: '150px' }}
                options={[
                  {
                    label: 'ปิดการตรวจสอบ',
                    value: 'Verified',
                  },
                  {
                    label: 'ยังไม่ยืนยันตัวตน',
                    value: 'Unverified',
                  },
                  {
                    label: 'เติมตรวจสอบแล้วล้มเหลว',
                    value: 'Fail procress',
                  },
                  {
                    label: 'ต้องการข้อมูลเพิ่ม',
                    value: 'Wait for info',
                  },
                  {
                    label: 'ผิดพลาด',
                    value: 'Error',
                  },
                  {
                    label: 'ไม่พบ',
                    value: 'Undefine',
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Descriptions.Item>
        <Descriptions.Item label="รายละเอียด">
          {data?.description && data?.description !== ''
            ? data?.description
            : '-'}
        </Descriptions.Item>
      </Descriptions>
    );
  };
