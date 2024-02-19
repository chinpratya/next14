import {
  Card,
  Col,
  Descriptions,
  FormInstance,
  Row,
} from 'antd';

import { getColLayout } from '@/utils';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationInfo } from '../../types';
import { OrganizationBasicInfoContactList } from '../organization-basic-info-contact-list';
import { OrganizationBasicInfoGeneralData } from '../organization-basic-info-general-data';
import { OrganizationBasicInfoUnitList } from '../organization-basic-info-unit-list';

type OrganizationBasicInfoProps = {
  form: FormInstance;
  data?: OrganizationInfo;
  loading: boolean;
};

export const OrganizationBasicInfo = ({
  form,
  data,
  loading,
}: OrganizationBasicInfoProps) => {
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            loading={loading}
            title={
              <IntlMessage id="compliance.organization.detail.basicInfo" />
            }
            style={{ paddingBottom: 11 }}
          >
            <OrganizationBasicInfoGeneralData
              form={form}
            />
          </Card>
        </Col>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="compliance.organization.detail" />
            }
            loading={loading}
          >
            <Descriptions
              column={2}
              layout="vertical"
              labelStyle={{ fontWeight: 'bold' }}
            >
              <Descriptions.Item
                label={
                  <IntlMessage id="compliance.organization.detail.updatedDt" />
                }
              >
                <ShowPassTagDate date={data?.updatedDt} />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage id="compliance.organization.detail.createdDt" />
                }
              >
                <ShowTagDate date={data?.createdDt} />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage id="compliance.organization.detail.createdBy" />
                }
              >
                {data?.createdBy}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <OrganizationBasicInfoContactList
            orgName={data?.name ?? ''}
          />
        </Col>
      </Row>
      <OrganizationBasicInfoUnitList />
    </>
  );
};
