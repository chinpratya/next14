import { Card, Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useMemo, useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityLawfulBasis } from '../../api/get-activity-lawful-basis';
import { useGetActivityMeta } from '../../api/get-activity-meta';
import { useUpdateActivityLawfulBasis } from '../../api/update-activity-lawful-basis';
import { ActivityBasisPurpose } from '../activity-basis-purpose';

type ActivityLawfulBasisLegalBasisProps = {
  activityId: string;
};

export const ActivityLawfulBasisLegalBasis = ({
  activityId,
}: ActivityLawfulBasisLegalBasisProps) => {
  const meta = useGetActivityMeta({});
  const { data, isLoading, isError } =
    useGetActivityLawfulBasis(activityId);

  const { submit } = useUpdateActivityLawfulBasis({
    activityId,
  });

  const basisOptions = useMemo(() => {
    return (
      meta?.data?.legalBasis?.map((item) => ({
        label: item.name,
        value: item.ObjectUUID,
      })) || []
    );
  }, [meta?.data?.legalBasis]);

  const selectedBasisIDs: CheckboxValueType[] =
    useMemo(() => {
      return data?.basis
        ? data?.basis.map((item) => item.basisID)
        : [];
    }, [data?.basis]);

  const [selectedBasis, setSelectedBasis] = useState<
    CheckboxValueType[]
  >([]);

  const [
    originalRightsOfDataSubjectId,
    setOriginalRightsOfDataSubjectId,
  ] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setOriginalRightsOfDataSubjectId(
        data?.rightsOfDataSubjects?.map(
          (item) => item.rightsOfDataSubjectID
        ) || []
      );
    };
    fetchData();
  }, [data]);

  const onChange = (
    checkedValue: CheckboxValueType[]
  ) => {
    setSelectedBasis(checkedValue);
    submit({
      basisId: checkedValue as string[],
      rightsOfDataSubjectId:
        originalRightsOfDataSubjectId,
    });
  };

  useEffect(() => {
    setSelectedBasis(selectedBasisIDs);
  }, [selectedBasisIDs]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.title" />
        }
        loading={isLoading}
      >
        <Checkbox.Group
          value={selectedBasis}
          onChange={onChange}
        >
          <Row gutter={[8, 8]}>
            {basisOptions.map((option) => (
              <Col key={option.value} span={8}>
                <Checkbox value={option.value}>
                  {option.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Card>
      {selectedBasis.length > 0 ? (
        <ActivityBasisPurpose
          activityId={activityId}
          selectedBasis={selectedBasis}
          data={data}
        />
      ) : null}
    </FallbackError>
  );
};
