import { Card } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { Line } from '@/components/chart-components/line';
import { Loading } from '@/components/share-components/loading';
import { FallbackError } from '@/components/util-components/fallback-error';

import { useListOrganizationUnitAssessmentGrowthSection } from '../../api/list-organization-unit-assessment-list-assigned-growth-section';

export const OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsGrowthSection =
  () => {
    const router = useRouter();

    const organizationId = router.query
      .organizationId as string;
    const instituteId = router.query
      .instituteId as string;
    const assignmentId = router.query
      .assignmentId as string;

    const { data, isLoading, isError } =
      useListOrganizationUnitAssessmentGrowthSection({
        organizationId,
        instituteId,
        assignmentId,
      });

    if (isLoading) {
      return <Loading cover="content" />;
    }

    const dataGraph = _.map(
      _.get(data, 'data.graph'),
      (value) => {
        return {
          name: value.label,
          data: value.data,
          type: 'line',
          stack: 'Total',
        };
      }
    );

    return (
      <FallbackError isError={isError}>
        <Card title="แสดงการเติบโตภาพรวม ของแต่ละส่วนของบริษัท ซีเครียวริตี้ พิทช์ จำกัด">
          <Line
            xData={data?.data?.meta}
            seriesData={dataGraph}
          />
        </Card>
      </FallbackError>
    );
  };
