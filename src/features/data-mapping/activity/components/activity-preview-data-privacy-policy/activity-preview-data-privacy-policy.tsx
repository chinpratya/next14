import { Typography } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { ActivityPreview } from '../../types';

import { ActivityPreviewDataPrivacyPolicyDataRetentionMethod } from './activity-preview-data-privacy-policy-data-retention-method';
import { ActivityPreviewDataPrivacyPolicyRemoveOrDelete } from './activity-preview-data-privacy-policy-remove-or-delete';
import { ActivityPreviewDataPrivacyPolicyRightsAccessPersonalData } from './activity-preview-data-privacy-policy-rights-access-personal-data';
import { ActivityPreviewDataPrivacyPolicyRightsOfPersonalData } from './activity-preview-data-privacy-policy-rights-of-personal-data';
import { ActivityPreviewDataPrivacyPolicySecurityMeasures } from './activity-preview-data-privacy-policy-security-measures';
import { ActivityPreviewDataPrivacyPolicyStorage } from './activity-preview-data-privacy-policy-storage';
import { ActivityPreviewDataPrivacyPolicyStorageType } from './activity-preview-data-privacy-policy-storage-type';

type ActivityPreviewDataPrivacyPolicyProps = {
  data?: ActivityPreview;
};

export const ActivityPreviewDataPrivacyPolicy = ({
  data,
}: ActivityPreviewDataPrivacyPolicyProps) => {
  return (
    <>
      <Typography.Title
        level={4}
        style={{ fontWeight: 'bold' }}
      >
        <IntlMessage id="dataMapping.activity.preview.privacyPolicy.title" />
      </Typography.Title>
      <ActivityPreviewDataPrivacyPolicyStorage
        data={data}
      />
      <ActivityPreviewDataPrivacyPolicyStorageType
        data={data}
      />
      <ActivityPreviewDataPrivacyPolicyDataRetentionMethod
        data={data}
      />
      <ActivityPreviewDataPrivacyPolicyRightsAccessPersonalData
        data={data}
      />
      <ActivityPreviewDataPrivacyPolicyRemoveOrDelete
        data={data}
      />
      <ActivityPreviewDataPrivacyPolicySecurityMeasures
        data={data}
      />
      <ActivityPreviewDataPrivacyPolicyRightsOfPersonalData
        data={data}
      />
    </>
  );
};
