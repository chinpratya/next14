import { Col, Row, FormInstance } from 'antd';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetConsentManagementMetaPurpose } from '../../api/get-consent-management-meta-purpose';
import {
  ConsentPurposeDetail,
  Preference,
} from '../../types';

import {
  PurposeSettingImpact,
  PurposeSettingAddPreference,
  PurposeSettingDisplay,
} from './components';

type PurposeSettingProps = {
  form: FormInstance;
  preferences?: Preference[];
  onChangePreference: (preferences: Preference[]) => void;
  loading?: boolean;
  dataPurpose?: ConsentPurposeDetail;
};
export const PurposeSetting = ({
  form,
  preferences = [],
  onChangePreference,
  loading = false,
  dataPurpose,
}: PurposeSettingProps) => {
  const { data, isLoading, isError } =
    useGetConsentManagementMetaPurpose();

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [
      permissions['pdpakit:consent:purpose:update'],
    ],
  });

  if (loading) {
    return <Loading cover={'page'} />;
  }

  return (
    <FallbackError isError={isError}>
      <Row gutter={[10, 10]}>
        <Col {...getColLayout([24, 24, 24, 24, 12, 12])}>
          <PurposeSettingImpact
            form={form}
            dataIsEffect={dataPurpose?.isEffect}
          />
          <PurposeSettingAddPreference
            preferenceTypes={data?.perferenceType ?? []}
            preferences={preferences}
            onChangePreference={onChangePreference}
            disabled={!editPermission.isAllow}
          />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 12, 12])}>
          <PurposeSettingDisplay
            form={form}
            displayType={data?.displayType ?? []}
            loading={isLoading}
            preferences={preferences}
          />
        </Col>
      </Row>
    </FallbackError>
  );
};
