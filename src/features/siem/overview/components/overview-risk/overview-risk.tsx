import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import { getColLayout } from '@/utils';

import { OverviewRiskCard } from './overview-risk-card';

type OverviewRiskProps = {
  severityCount?: {
    label: string;
    value: number;
  }[];
  isRefetching?: boolean;
};

type SeverityItem = {
  label: string;
  value: number;
  background: string;
};

const defaultSeverityItems: Record<string, SeverityItem> =
  {
    CRITICAL: {
      label: 'siem.overview.critical',
      value: 0,
      background: '#E52917',
    },
    HIGH: {
      label: 'siem.overview.high',
      value: 0,
      background: '#FA8C16',
    },
    MEDIUM: {
      label: 'siem.overview.medium',
      value: 0,
      background: '#FFC542',
    },
    LOW: {
      label: 'siem.overview.low',
      value: 0,
      background: '#04D182',
    },
  };

export const OverviewRisk = ({
  severityCount,
  isRefetching,
}: OverviewRiskProps) => {
  const [severityItems, setSeverityItems] = useState(
    defaultSeverityItems
  );

  useEffect(() => {
    if (severityCount) {
      const newSeverityItems = {
        ...defaultSeverityItems,
      };

      severityCount.forEach((item) => {
        if (!!item.label) {
          newSeverityItems[item.label].value = item.value;
        }
      });

      setSeverityItems(newSeverityItems);
    }
  }, [severityCount]);

  return (
    <Row gutter={[16, 16]}>
      {Object.entries(severityItems).map(
        ([key, value]) => (
          <Col
            {...getColLayout([24, 12, 12, 6, 6, 6])}
            key={key}
          >
            <OverviewRiskCard
              {...value}
              isLoading={isRefetching}
            />
          </Col>
        )
      )}
    </Row>
  );
};
