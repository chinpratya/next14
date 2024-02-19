import { Card, Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useMemo, useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityLawfulBasis } from '../../api/get-activity-lawful-basis';
import { useGetActivityMeta } from '../../api/get-activity-meta';
import { useUpdateActivityLawfulBasis } from '../../api/update-activity-lawful-basis';

type ActivityLawfulBasisRightsOfDataSubjectsProps = {
  activityId: string;
};

export const ActivityLawfulBasisRightsOfDataSubjects = ({
  activityId,
}: ActivityLawfulBasisRightsOfDataSubjectsProps) => {
  const meta = useGetActivityMeta({});
  const { data, isLoading, isError } =
    useGetActivityLawfulBasis(activityId);

  const { submit } = useUpdateActivityLawfulBasis({
    activityId,
  });

  const dataSubjectOptions =
    meta?.data?.rightsOfAccessData?.map((item) => ({
      label: item.name,
      value: item.ObjectUUID,
    })) || [];

  const selectedDataSubjectIDs: CheckboxValueType[] =
    useMemo(() => {
      return data?.rightsOfDataSubjects
        ? data?.rightsOfDataSubjects.map(
            (item) => item.rightsOfDataSubjectID
          )
        : [];
    }, [data?.rightsOfDataSubjects]);

  const [selectedDataSubjects, setSelectedDataSubjects] =
    useState<CheckboxValueType[]>([]);

  const [originalBasisId, setOriginalBasisId] = useState<
    string[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setOriginalBasisId(
        data?.basis?.map((item) => item.basisID) || []
      );
    };
    fetchData();
  }, [data]);

  const onChange = (
    checkedValue: CheckboxValueType[]
  ) => {
    setSelectedDataSubjects(checkedValue);
    submit({
      basisId: originalBasisId,
      rightsOfDataSubjectId: checkedValue as string[],
    });
  };

  useEffect(() => {
    setSelectedDataSubjects(selectedDataSubjectIDs);
  }, [selectedDataSubjectIDs]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.lawfulBasis.rights.title" />
        }
        loading={isLoading}
      >
        <Checkbox.Group
          value={selectedDataSubjects}
          onChange={onChange}
        >
          <Row gutter={[8, 8]}>
            {dataSubjectOptions.map((option) => (
              <Col key={option.value} span={8}>
                <Checkbox value={option.value}>
                  {option.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Card>
    </FallbackError>
  );
};
