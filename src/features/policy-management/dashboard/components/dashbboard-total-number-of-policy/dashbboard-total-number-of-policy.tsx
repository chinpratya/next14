import { Col, Row } from 'antd';
import Image from 'next/image';

import { ShowCardCount } from '@/components/share-components/show-card-count';
import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { PolicyDashboard } from '../../types';

type DashboardTotalNumberOfPolicyProps = {
  data?: PolicyDashboard;
};

export const DashboardTotalNumberOfPolicy = ({
  data,
}: DashboardTotalNumberOfPolicyProps) => {
  return (
    <Row
      justify={'space-between'}
      align={'middle'}
      gutter={[10, 10]}
      className="mb-3"
    >
      <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
        <ShowCardCount
          number={
            data?.policy_publish ||
            data?.policy_publish !== ''
              ? (data?.policy_publish as number | string)
              : '0'
          }
          title={
            <IntlMessage id="policyManagement.dashboard.policyPublish" />
          }
          icon={
            <Image
              src={
                '/img/policy-management/policy-publish.png'
              }
              alt=""
              width={50}
              height={50}
            />
          }
          color="#005745"
        />
      </Col>
      <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
        <ShowCardCount
          number={
            data?.policy_inprogress ||
            data?.policy_inprogress !== ''
              ? (data?.policy_inprogress as
                  | number
                  | string)
              : '0'
          }
          title={
            <IntlMessage id="policyManagement.dashboard.policyInProgress" />
          }
          icon={
            <Image
              src={
                '/img/policy-management/policy-inprogress.png'
              }
              alt=""
              width={50}
              height={50}
            />
          }
          color="#20325E"
        />
      </Col>
      <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
        <ShowCardCount
          number={
            data?.policy_to_be_reviewed ||
            data?.policy_to_be_reviewed !== ''
              ? (data?.policy_to_be_reviewed as
                  | number
                  | string)
              : '0'
          }
          title={
            <IntlMessage id="policyManagement.dashboard.policy30Day" />
          }
          icon={
            <Image
              src={
                '/img/policy-management/policy-30Day.png'
              }
              alt=""
              width={50}
              height={50}
            />
          }
          color="#D87000"
        />
      </Col>
      <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
        <ShowCardCount
          number={
            data?.policy_overdue ||
            data?.policy_overdue !== ''
              ? (data?.policy_overdue as number | string)
              : '0'
          }
          title={
            <IntlMessage id="policyManagement.dashboard.policyOverdue" />
          }
          icon={
            <Image
              src={
                '/img/policy-management/policy-overdue.png'
              }
              alt=""
              width={50}
              height={50}
            />
          }
          color="#C92D34"
        />
      </Col>
    </Row>
  );
};
