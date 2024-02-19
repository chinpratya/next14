import { Col, Row } from 'antd';

import { ShowCardNumber } from '@/components/share-components/show-card-number';
import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout } from '@/utils';

import { WidgetReport } from '../../types';

type OverviewCountProps = {
  data?: WidgetReport;
  isRefetching?: boolean;
};

export const OverviewCount = ({
  data,
  isRefetching,
}: OverviewCountProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
        <ShowCardNumber
          number={data?.device_count ?? 0}
          title={
            <IntlMessage id="siem.overview.device" />
          }
          annotation={
            <IntlMessage id="siem.overview.count" />
          }
          isLoading={isRefetching}
        />
      </Col>
      <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
        <ShowCardNumber
          number={data?.detection_count ?? 0}
          title={
            <IntlMessage id="siem.overview.detectionCount" />
          }
          annotation={
            <IntlMessage id="siem.overview.count" />
          }
          isLoading={isRefetching}
        />
      </Col>
      <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
        <ShowCardNumber
          number={data?.rule_count ?? 0}
          title={
            <IntlMessage id="siem.overview.detectionRule" />
          }
          annotation={
            <IntlMessage id="siem.overview.count" />
          }
          isLoading={isRefetching}
        />
      </Col>
    </Row>
  );
};
