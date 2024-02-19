import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Cascader,
  Select,
} from 'antd';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetAddressProvince,
  provinceType,
  districtType,
  useGetAddressDistrict,
} from '@/features/shared';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListOrganizationMeta } from '../../api/organization-meta';

type OrganizationBasicInfoUnitGeneralDataFormProps = {
  form: FormInstance;
  porvinceId?: string;
};

export const OrganizationBasicInfoUnitGeneralDataFrom = ({
  form,
  porvinceId,
}: OrganizationBasicInfoUnitGeneralDataFormProps) => {
  const { t } = useTranslation();
  const [provinceID, setProvinceID] = useState('');
  const { data } = useListOrganizationMeta();
  const provinceData = useGetAddressProvince();
  const districtData = useGetAddressDistrict(provinceID);

  const provinceOptions = _.map(
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

  const groupOptions = _.map(
    data?.data?.orgGroup,
    (obj) => {
      const children = _.get(obj, 'children');

      return {
        label: obj.name,
        value: obj.ObjectUUID,
        children: _.map(children, (child) => {
          return {
            label: child.name,
            value: child.ObjectUUID,
          };
        }),
      };
    }
  );

  const industryGroupOptions = _.map(
    data?.data?.industryGroupAndBusinessCategory,
    (obj) => {
      const children = _.get(obj, 'children');

      return {
        label: obj.name,
        value: obj.ObjectUUID,
        children: _.map(children, (child) => {
          return {
            label: child.name,
            value: child.ObjectUUID,
          };
        }),
      };
    }
  );

  const onChangeProvince = (id: string) => {
    setProvinceID(id);
  };

  useEffect(() => {
    if (porvinceId) {
      setProvinceID(porvinceId);
    }
  }, [porvinceId]);

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item
            name="name"
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.name" />
            }
            rules={[
              validation.required(
                t(
                  'compliance.organization.detail.branch.basicInfo.nameRequired'
                )
              ),
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.organization" />
            }
            name="organizationId"
            rules={[
              validation.required(
                t(
                  'compliance.organization.detail.branch.basicInfo.organizationRequired'
                )
              ),
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.orgGroup" />
            }
            name="organizationGroup"
          >
            <Cascader options={groupOptions} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.industryGroupAndBusinessCategory" />
            }
            name="industryGroupBusinessGroup"
          >
            <Cascader options={industryGroupOptions} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.province" />
            }
            name="province"
          >
            <Select
              onChange={onChangeProvince}
              options={provinceOptions}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.district" />
            }
            name="district"
          >
            <Select
              loading={districtData.isLoading}
              options={districtOptions}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.description" />
            }
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
