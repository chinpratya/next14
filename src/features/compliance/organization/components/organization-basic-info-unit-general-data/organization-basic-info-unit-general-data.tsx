import {
  Card,
  Col,
  Descriptions,
  FormInstance,
  Row,
  Typography,
} from 'antd';
import { useEffect } from 'react';

import { ShowPassTagDate } from '@/components/share-components/show-pass-tag-date';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { useToggle } from '@/hooks';
import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationUnit, HCode } from '../../types';
import { OrganizationBasicInfoUnitGeneralDataContactList } from '../organization-basic-info-unit-general-data-contact-list';
import { OrganizationBasicInfoUnitGeneralDataFrom } from '../organization-basic-info-unit-general-data-form';
import { OrganizationBasicInfoUnitUpdateModal } from '../organization-basic-info-unit-update-modal';

type OrganizationBasicInfoUnitGeneralDataProps = {
  form: FormInstance;
  data: OrganizationUnit;
  orgName: string;
};

export const OrganizationBasicInfoUnitGeneralData = ({
  form,
  data,
  orgName,
}: OrganizationBasicInfoUnitGeneralDataProps) => {
  const toggle = useToggle();

  const onSelected = (values: HCode) => {
    form.setFieldsValue(values);
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        organizationId: orgName,
        industryGroupBusinessGroup: !data.industryGroupID
          ? undefined
          : [
              data.industryGroupID,
              data.businessCategoryID,
            ],
      });
    }

    return () => {
      form.resetFields();
    };
  }, [data, form, orgName]);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.general" />
            }
          >
            <Typography.Text
              strong
              className="d-inline-block mb-3"
            >
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.detailSubOrg" />
            </Typography.Text>
            <OrganizationBasicInfoUnitGeneralDataFrom
              form={form}
              porvinceId={data.province ?? ''}
            />
          </Card>
        </Col>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="compliance.organization.detail.branch.basicInfo.detail" />
            }
          >
            <Descriptions
              column={{
                xs: 1,
                sm: 1,
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
              layout="vertical"
            >
              <Descriptions.Item
                label={
                  <IntlMessage id="compliance.organization.detail.branch.basicInfo.updatedDt" />
                }
              >
                <ShowPassTagDate date={data?.updatedDt} />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage id="compliance.organization.detail.branch.basicInfo.createdDt" />
                }
              >
                <ShowTagDate date={data?.createdDt} />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage id="compliance.organization.detail.branch.basicInfo.createdBy" />
                }
              >
                {data?.createdBy}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <OrganizationBasicInfoUnitGeneralDataContactList
            orgName={orgName}
            branchId={data?.ObjectUUID}
          />
        </Col>
      </Row>

      <OrganizationBasicInfoUnitUpdateModal
        open={toggle.openEdit}
        onCancel={toggle.edit}
        onOk={onSelected}
        data={data}
      />
    </>
  );
};
