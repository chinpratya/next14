import { css } from '@emotion/css';
import { Card, Descriptions } from 'antd';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout } from '@/utils';

import {
  severityItems,
  statusItems,
} from '../../../shared/constant/incident';
import { IncidentInfo } from '../../types';

type IncidentDetailProps = {
  incident?: IncidentInfo;
};

export const IncidentDetail = ({
  incident,
}: IncidentDetailProps) => {
  return (
    <Card
      title={
        <IntlMessage id="siem.incidentManagementDetails.incidentDetails" />
      }
    >
      <Descriptions
        bordered
        {...getColLayout([3, 3, 3, 3, 2, 1])}
        className={css`
          .ant-descriptions-item-content {
            background: white;
          }
          .ant-descriptions-item-label {
            font-weight: 700;
          }
        `}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.incidentId" />
          }
        >
          {incident?.code}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.incidentName" />
          }
        >
          {incident?.rule_name}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.DetectionTime" />
          }
        >
          <ShowTagDate date={incident?.created_date} />
        </Descriptions.Item>
        <Descriptions.Item
          span={1}
          label={
            <IntlMessage id="siem.incidentManagementDetails.assign" />
          }
        >
          {incident?.assignes?.[0].email ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.TotalDetectionLogs" />
          }
        >
          {incident?.total_record ?? 0}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.siemActionStatus" />
          }
        >
          <ShowTagStatus
            items={statusItems.map((item) => ({
              ...item,
              label: item.label,
            }))}
            status={incident?.assign_status}
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.severity" />
          }
        >
          <ShowTagStatus
            items={severityItems.map((item) => ({
              ...item,
              label: item.label,
            }))}
            status={incident?.severity}
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.condition" />
          }
          span={2}
        >
          {incident?.condition}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="siem.incidentManagementDetails.description" />
          }
          span={3}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {!!incident?.description
            ? incident.description
            : '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
