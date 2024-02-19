import { css } from '@emotion/css';
import { Card, Row, Col, Button, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DropdownCheckbox } from '@/components/share-components/dropdown-checkbox';
import { DropdownRedio } from '@/components/share-components/dropdown-redio';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardMeta } from '../share/api/get-dashboard-meta';
import { OptionsDashboard } from '../share/types/dashboard';

type OptionShowContentProps = {
  setOrgId: (id: string[]) => void;
  setBranch: (id: string[]) => void;
  setAssessment: (id: string) => void;
  setAssessmentSub: (id: string[]) => void;
  // organizationID: string[];
  // branchID: string[];
  // assessmentID: string;
  // assessmentSubmissionID: string[];
};
export const OptionShowContent = ({
  setOrgId,
  setBranch,
  setAssessment,
  setAssessmentSub,
}: // organizationID,
// branchID,
// assessmentID,
// assessmentSubmissionID,
OptionShowContentProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } =
    useGetDashboardMeta();
  const [organizations, setOrganizations] = useState<
    string[]
  >([]);
  const [branchs, setBranchs] = useState<string[]>([]);
  const [assessments, setAssessments] =
    useState<string>('');
  const [
    assessmentSubmissions,
    setAssessmentSubmissions,
  ] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setOrgId(
        _.map(
          data.data.organizations,
          (value) => value.ObjectUUID
        )
      );
      setOrganizations(
        _.map(
          data.data.organizations,
          (value) => value.ObjectUUID
        )
      );
      setBranch(
        _.map(
          data.data.branchs,
          (value) => value.ObjectUUID
        )
      );
      setBranchs(
        _.map(
          data.data.branchs,
          (value) => value.ObjectUUID
        )
      );
      setAssessment(
        _.get(data.data.assessments, '[0].ObjectUUID', '')
      );
      setAssessments(
        _.get(data.data.assessments, '[0].ObjectUUID', '')
      );
      setAssessmentSub(
        _.map(
          data.data.assessmentSubmissions,
          (value) => value.ObjectUUID
        )
      );
      setAssessmentSubmissions(
        _.map(
          data.data.assessmentSubmissions,
          (value) => value.ObjectUUID
        )
      );
    }
  }, [data]);

  const getOptions = (value: OptionsDashboard[]) => {
    const options = _.map(
      value,
      (v: OptionsDashboard) => {
        return {
          label: v.name,
          value: v.ObjectUUID,
        };
      }
    );
    return options;
  };

  const onSubmit = () => {
    setOrgId(organizations);
    setBranch(branchs);
    setAssessment(assessments);
    setAssessmentSub(assessmentSubmissions);
    console.log('onSubmit', assessmentSubmissions);
  };

  const setOrgs = (id: string[]) => setOrganizations(id);
  const setBranchId = (id: string[]) => setBranchs(id);
  const setAssessmentId = (id: string) =>
    setAssessments(id);
  const setAssessmentSubId = (id: string[]) =>
    setAssessmentSubmissions(id);
  return (
    <FallbackError isError={isError}>
      <Card loading={isLoading}>
        <Row justify={'space-between'} align={'middle'}>
          <Col {...getColLayout([24, 24, 5, 5, 5, 5])}>
            <Typography.Text
              className={css`
                padding: 0 15px;
              `}
            >
              <IntlMessage id="compliance.dashboard.organization" />
            </Typography.Text>
            <DropdownCheckbox
              option={getOptions(
                data?.data.organizations ?? []
              )}
              valueKey={organizations}
              placeholder={
                t(
                  'compliance.dashboard.organization'
                ) as string
              }
              onFinish={setOrgs}
            />
          </Col>
          <Col {...getColLayout([24, 24, 5, 5, 5, 5])}>
            <Typography.Text
              className={css`
                padding: 0 15px;
              `}
            >
              <IntlMessage id="compliance.dashboard.branch" />
            </Typography.Text>
            <DropdownCheckbox
              option={getOptions(
                data?.data.branchs ?? []
              )}
              valueKey={branchs}
              placeholder={
                t('compliance.dashboard.branch') as string
              }
              onFinish={setBranchId}
            />
          </Col>
          <Col
            {...getColLayout([24, 24, 5, 5, 5, 5])}
            className={css`
              margin: 10px 0;
            `}
          >
            <Typography.Text
              className={css`
                padding: 0 15px;
              `}
            >
              <IntlMessage id="compliance.dashboard.assessmentInventory" />
            </Typography.Text>
            <DropdownRedio
              option={getOptions(
                data?.data.assessments ?? []
              )}
              valueKey={assessments}
              placeholder={
                t(
                  'compliance.dashboard.assessmentInventory'
                ) as string
              }
              onFinish={setAssessmentId}
            />
          </Col>
          <Col
            {...getColLayout([24, 24, 5, 5, 5, 5])}
            className={css`
              margin: 10px 0;
            `}
          >
            <Typography.Text
              className={css`
                padding: 0 15px;
              `}
            >
              <IntlMessage id="compliance.dashboard.assessment" />
            </Typography.Text>
            <DropdownCheckbox
              option={getOptions(
                data?.data.assessmentSubmissions ?? []
              )}
              valueKey={assessmentSubmissions}
              placeholder={
                t(
                  'compliance.dashboard.assessment'
                ) as string
              }
              onFinish={setAssessmentSubId}
            />
          </Col>
          <Col
            {...getColLayout([24, 24, 2, 2, 2, 2])}
            className={css`
              margin: 10px 0;
            `}
          >
            <Button
              type="primary"
              className={css`
                margin-top: 20px;
                width: 100%;
              `}
              onClick={() => onSubmit()}
            >
              <IntlMessage id="compliance.dashboard.submit" />
            </Button>
          </Col>
        </Row>
      </Card>
    </FallbackError>
  );
};
