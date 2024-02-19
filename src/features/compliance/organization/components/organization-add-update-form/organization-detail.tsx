import {
  Cascader,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';
import _ from 'lodash';

import validation from '@/utils/validation';

import { useListOrganizationMeta } from '../../api/organization-meta';

export const OrganizationDetail = () => {
  const { data: meta, isLoading: metaLoading } =
    useListOrganizationMeta();

  const industrybusinessOption = _.map(
    _.get(
      meta,
      'data.industryGroupAndBusinessCategory'
    ) ?? [],
    (obj) => {
      return {
        value: obj.ObjectUUID,
        label: obj.name,
        children: _.map(obj.children, (ob) => {
          return {
            value: ob.ObjectUUID,
            label: ob.name,
          };
        }),
      };
    }
  );

  return (
    <>
      <Typography.Text
        className="d-inline-block mt-3 mb-4"
        strong
      >
        รายละเอียดองค์กร
      </Typography.Text>
      <Row gutter={[34, 0]}>
        <Col span={12}>
          <Form.Item
            label="ชื่อ"
            name="hospital"
            rules={[validation.required('ไม่พบชื่อ')]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="สังกัด"
            name="agency"
            rules={[validation.required('ไม่พบสังกัด')]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="กลุ่มอุตสาหกรรม/หมวดหมู่ธุรกิจ"
            name="industryGroup/businessCategory"
            initialValue={[
              '71dfabe9-e383-45c2-91cc-9d9a9a3a1620',
              'b74fe640-2f27-4a6c-97c5-2ca2327b637a',
            ]}
          >
            <Cascader
              disabled
              loading={metaLoading}
              options={industrybusinessOption ?? []}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
