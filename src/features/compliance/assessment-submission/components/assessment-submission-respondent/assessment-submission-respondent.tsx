import { css } from '@emotion/css';
import { Card } from 'antd';
import { useState } from 'react';

import { InnerAppLayout } from '@/layouts';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListOrganizationRespondent } from '../../api/list-organization-respondent';

import { BranchMenu } from './branch-menu';
import { ListRespondents } from './list-respondents';

export type AssessmentSubmissionRespondentProps = {
  assessmentId: string;
  assessmentStatus: string;
};

export const AssessmentSubmissionRespondent = ({
  assessmentId,
  assessmentStatus,
}: AssessmentSubmissionRespondentProps) => {
  const [navigation, setNavigation] = useState({
    organization: '',
    branch: '',
  });

  const onChangeNavigation = (keyPath: string[]) => {
    const [branch, organization] = keyPath;
    setNavigation({ branch, organization });
  };

  const listOrgRespondent = useListOrganizationRespondent(
    { assessmentId }
  );

  return (
    <FallbackError isError={listOrgRespondent.isError}>
      <Card
        loading={listOrgRespondent.isLoading}
        className={css`
          .ant-card-body {
            padding: ${!listOrgRespondent.isLoading
              ? '0'
              : '24px'};
          }
          .main-content {
            overflow: hidden;
          }
        `}
      >
        <InnerAppLayout
          border={true}
          sideContentWidth={350}
          sideContent={
            <BranchMenu
              orgRespondent={listOrgRespondent.data?.data}
              onChangeNavigation={onChangeNavigation}
            />
          }
          mainContent={
            <ListRespondents
              navigation={navigation}
              assessmentId={assessmentId}
              assessmentStatus={assessmentStatus}
            />
          }
        />
      </Card>
    </FallbackError>
  );
};
