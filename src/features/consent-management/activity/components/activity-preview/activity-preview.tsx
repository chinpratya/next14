import { Card, Form } from 'antd';

import { ConsentBuilderPurposeWidget } from '@/shared';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityPreview } from '../../api/get-activity-preview';

type ActivityPreviewProps = {
  activityId: string;
};

export const ActivityPreview = ({
  activityId,
}: ActivityPreviewProps) => {
  const { data, isLoading, isError } =
    useGetActivityPreview({ activityId });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="consentManagement.activity.activityDetail.preview" />
        }
        loading={isLoading}
        className="cursor-not-allowed"
      >
        <Form
          style={{
            pointerEvents: 'none',
          }}
        >
          {data?.map((purpose) => (
            <ConsentBuilderPurposeWidget
              key={purpose.purposeID}
              purpose={purpose}
            />
          ))}
        </Form>
      </Card>
    </FallbackError>
  );
};
