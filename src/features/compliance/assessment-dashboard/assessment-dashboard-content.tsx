import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Col,
  Row,
  Divider,
  Empty,
} from 'antd';
import _ from 'lodash';
import { useState } from 'react';

import { CardShowDetailProgress } from '@/components/share-components/card-show-detail-progress';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetDashboard } from '../share/api/get-dashboard';
import {
  AssessmentSubmission,
  DashboardResponse,
} from '../share/types/dashboard';

import { AssessmentDashboardChartContent } from './assessment-dashboard-chart-content';
import { OptionShowContent } from './option-show-content';

export const AssessmentDashboardContent = () => {
  const [organizationID, setOrganizationID] = useState<
    string[]
  >([]);
  const [branchID, setBranchID] = useState<string[]>([]);
  const [assessmentID, setAssessmentID] =
    useState<string>('');
  const [
    assessmentSubmissionID,
    setAssessmentSubmissionID,
  ] = useState<string[]>([]);

  const [assessmentIndex, setAssessmentIndex] =
    useState<number>(0);

  const { data, isError, isLoading } = useGetDashboard({
    organizationID,
    branchID,
    assessmentID,
    assessmentSubmissionID,
  });

  const getDataProgress = (
    assessmentData: AssessmentSubmission | undefined
  ) => {
    if (assessmentData) {
      const dataProgress = _.map(
        assessmentData.ranking,
        (v) => {
          return {
            label: v.name,
            value: Math.floor(v.value),
          };
        }
      );
      return dataProgress;
    }

    return undefined;
  };
  const onNext = () =>
    setAssessmentIndex(assessmentIndex + 1);
  const onBack = () =>
    setAssessmentIndex(assessmentIndex - 1);

  const setOrgId = (id: string[]) =>
    setOrganizationID(id);
  const setBranch = (id: string[]) => setBranchID(id);
  const setAssessment = (id: string) =>
    setAssessmentID(id);
  const setAssessmentSub = (id: string[]) =>
    setAssessmentSubmissionID(id);

  return (
    <FallbackError isError={isError}>
      <OptionShowContent
        setOrgId={setOrgId}
        setBranch={setBranch}
        setAssessment={setAssessment}
        setAssessmentSub={setAssessmentSub}
      />
      <Card
        title={`Assessment Form Name : ${_.get(
          data?.data,
          `assessments[0].name`,
          '-'
        )}`}
        loading={isLoading}
        extra={
          <Flex
            justify={'space-between'}
            align={'center'}
            className={css`
              width: 80px;
            `}
          >
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              size={'small'}
              onClick={onBack}
              disabled={
                _.get(data, 'data')
                  ? assessmentIndex === 0
                  : false
              }
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              size={'small'}
              onClick={onNext}
              disabled={
                _.get(data, 'data')
                  ? assessmentIndex ===
                    _.get(
                      data,
                      'data.assessments[0].assessmentSubmission',
                      []
                    ).length -
                      2
                  : false
              }
            />
          </Flex>
        }
        className={css`
          .ant-card-body {
            padding-top: 0;
          }
        `}
      >
        <Divider />
        <Row justify={'space-between'} align={'middle'}>
          {data?.data.assessments &&
          data?.data.assessments?.length > 0 ? (
            <>
              <Col
                {...getColLayout([
                  24, 24, 24, 24, 12, 12,
                ])}
              >
                <CardShowDetailProgress
                  title={_.get(
                    data?.data,
                    `assessments[0].assessmentSubmission[${assessmentIndex}].name`,
                    '-'
                  )}
                  width="98%"
                  data={getDataProgress(
                    _.get(
                      data?.data,
                      `assessments[0].assessmentSubmission[${assessmentIndex}]`,
                      undefined
                    )
                  )}
                />
              </Col>
              <Col
                {...getColLayout([
                  24, 24, 24, 24, 12, 12,
                ])}
              >
                <CardShowDetailProgress
                  title={_.get(
                    data?.data,
                    `assessments[0].assessmentSubmission[${
                      assessmentIndex + 1
                    }].name`,
                    '-'
                  )}
                  width="98%"
                  data={getDataProgress(
                    _.get(
                      data?.data,
                      `assessments[0].assessmentSubmission[${
                        assessmentIndex + 1
                      }]`,
                      undefined
                    )
                  )}
                />
              </Col>
            </>
          ) : (
            <Card
              className={css`
                width: 100%;
                padding-top: 20px;
              `}
            >
              <Empty />
            </Card>
          )}
        </Row>
      </Card>
      <AssessmentDashboardChartContent
        data={data as DashboardResponse}
      />
    </FallbackError>
  );
};
