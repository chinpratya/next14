import { ContainerOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Loading } from '@/components/share-components/loading';
import { PageHeader } from '@/components/share-components/page-header';
import { TitleHeader } from '@/components/share-components/title-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  useGetOrganization,
  useGetOrganizationUnit,
  useGetOrganizationUnitAssessmentListAssigned,
  OrganizationBasicInfoUnitAssessmentListAssignedDescription,
  OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsList,
  // OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsGrowth,
} from '@/features/compliance';
import { AppLayout } from '@/layouts';

// const getTabs = () => {
//   return [
//     {
//       label: 'รายชื่อผู้ทำแบบประเมิน',
//       key: 'listAssessors',
//       children: (
//         <OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsList />
//       ),
//     },
//     // {
//     //   label: 'การเติบโต',
//     //   key: 'growth',
//     //   children: (
//     //     <OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsGrowth />
//     //   ),
//     // },
//   ];
// };

const AssignmentPage = () => {
  const router = useRouter();

  const organizationId = router.query
    .organizationId as string;
  const instituteId = router.query.instituteId as string;
  const assignmentId = router.query
    .assignmentId as string;

  const organization = useGetOrganization(organizationId);
  const institute = useGetOrganizationUnit(
    organizationId,
    instituteId
  );

  const { data, isLoading, isError } =
    useGetOrganizationUnitAssessmentListAssigned(
      organizationId,
      instituteId,
      assignmentId
    );

  if (
    isLoading ||
    organization.isLoading ||
    institute.isLoading
  ) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <TitleHeader
            title="รายละเอียดแบบสำรวจ"
            icon={<ContainerOutlined />}
            meta={{
              organizationId: organization.data?.name,
              instituteId: institute.data?.name,
              assignmentId: data?.assessmentName,
            }}
            tabKeys={['listAssessors']}
          />
        }
      />
      <OrganizationBasicInfoUnitAssessmentListAssignedDescription
        data={data}
      />
      <Card title="รายชื่อผู้ทำแบบประเมิน">
        {/* <Tabs items={getTabs()} /> */}
        <OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsList />
      </Card>
    </FallbackError>
  );
};

AssignmentPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AssignmentPage;
