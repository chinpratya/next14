import { Col, FormInstance, Row } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { getColLayout } from '@/utils';

import { ReportFilter } from '../../types';
import { ReportEventUsageSummary } from '../report-event-usage-summary';
import { ReportHostEventSize } from '../report-host-event-size';
import { ReportHostEventTraffic } from '../report-host-event-traffic';
import { ReportIndiceEventSize } from '../report-indice-event-size';
import { ReportIndiceEventTraffic } from '../report-indice-event-traffic';
import { ReportSizeUsageSummary } from '../report-size-usage-summary';
import { ReportSummaryIncident } from '../report-summary-incident';
import { ReportUnresolvedIncidentList } from '../report-unresolved-incident-list';

import { ReportIndexFilter } from './report-index-filter';

type ReportIndexProps = {
  form: FormInstance;
};

export const ReportIndex = ({
  form,
}: ReportIndexProps) => {
  const [filter, setFilter] = useState<ReportFilter>({
    indices: [],
    hostname: [],
    timestamp: {
      from: dayjs()
        .startOf('day')
        .subtract(29, 'day')
        .add(7, 'hour')
        .toISOString(),
      to: dayjs().add(7, 'hour').toISOString(),
    },
  });

  const onSearch = async () => {
    const values = form.getFieldsValue();
    const [from, to]: Dayjs[] = values.timestamp;

    const allHostname = (
      values.hostname as string[]
    ).some((hostname) => hostname === '');

    setFilter({
      indices: values.indices ? [values.indices] : [],
      hostname: allHostname ? [] : values.hostname ?? [],
      timestamp: {
        from: from.add(7, 'hour').toISOString(),
        to: to.add(7, 'hour').toISOString(),
      },
    });
  };

  return (
    <>
      <ReportIndexFilter
        form={form}
        onSearch={onSearch}
      />
      <ReportUnresolvedIncidentList filter={filter} />
      <ReportEventUsageSummary filter={filter} />
      <ReportSizeUsageSummary filter={filter} />

      <Row gutter={[16, 20]}>
        <Col {...getColLayout(12)}>
          <ReportHostEventTraffic filter={filter} />
        </Col>
        <Col {...getColLayout(12)}>
          <ReportIndiceEventTraffic filter={filter} />
        </Col>
        <Col {...getColLayout(12)}>
          <ReportIndiceEventSize filter={filter} />
        </Col>
        <Col {...getColLayout(12)}>
          <ReportHostEventSize filter={filter} />
        </Col>
        <Col {...getColLayout(12)}>
          <ReportSummaryIncident filter={filter} />
        </Col>
      </Row>
    </>
  );
};
