import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetAddressProvince,
  provinceType,
  districtType,
  useGetAddressDistrict,
} from '@/features/shared';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type OrganizationBasicInfoUnitCreateFormProps = {
  form: FormInstance;
};

export const OrganizationBasicInfoUnitCreateForm = ({
  form,
}: OrganizationBasicInfoUnitCreateFormProps) => {
  const { t } = useTranslation();
  const [provinceID, setProvinceID] = useState('');

  const provinceData = useGetAddressProvince();
  const districtData = useGetAddressDistrict(provinceID);

  const onChangeProvince = (id: string) => {
    setProvinceID(id);
  };

  const ProvinceOptions = _.map(
    provinceData?.data?.data,
    (v: provinceType) => {
      return {
        value: v?.ProvinceID,
        label: v?.ProvinceThai,
      };
    }
  );

  const districtOptions = _.map(
    districtData?.data?.data,
    (v: districtType) => {
      return {
        value: v?.DistrictID,
        label: v?.DistrictThai,
      };
    }
  );

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[34, 0]}>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.name" />
            }
            name="name"
            rules={[
              validation.required(
                t(
                  'compliance.organization.detail.branch.nameRequired'
                )
              ),
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} className="align-self-end">
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.province" />
            }
            name="province"
          >
            <Select
              onChange={onChangeProvince}
              options={ProvinceOptions}
            />
          </Form.Item>
        </Col>
        <Col span={24} className="align-self-end">
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.district" />
            }
            name="district"
          >
            <Select
              options={districtOptions}
              disabled={!provinceID}
            />
          </Form.Item>
        </Col>
        <Col span={24} className="align-self-end">
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.description" />
            }
            name="description"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
