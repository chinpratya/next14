import { Card } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { Line } from '@/components/chart-components/line';
import { Loading } from '@/components/share-components/loading';
import { FallbackError } from '@/components/util-components/fallback-error';

import { useListOrganizationUnitAssessmentGrowthOverview } from '../../api/list-organization-unit-assessment-list-assigned-growth-overview';

export const OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsGrowthOverview =
  () => {
    const router = useRouter();

    const organizationId = router.query
      .organizationId as string;
    const instituteId = router.query
      .instituteId as string;
    const assignmentId = router.query
      .assignmentId as string;

    const { data, isLoading, isError } =
      useListOrganizationUnitAssessmentGrowthOverview({
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
        <Card title="แสดงการเติบโตภาพรวม ของสังกัด">
          <Line
            xData={data?.data?.meta}
            seriesData={
              dataGraph
              //   [
              //   {
              //     name: 'ซิเคียวริตี้พิทช์ จำกัด',
              //     type: 'line',
              //     stack: 'Total',
              //     data: ['40', '50'],
              //   },
              // ]
            }
          />
        </Card>
      </FallbackError>
    );
  };
