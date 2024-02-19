import { Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch } from '@/hooks';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { useListActivityUseAndPublishPurpose } from '../../api/list-activity-use-and-publish-purpose';
import { useUpdateDisclosureActorOfActivity } from '../../api/update-disclosure-actor-of-activity';

type ActivityDisclosureActorListPurposeProps = {
  purposeId: string;
  activityId: string;
  actorId: string;
  keyDisable?: string[] | undefined;
};

export const ActivityDisclosureActorListPurpose = ({
  purposeId,
  activityId,
  actorId,
  keyDisable,
}: ActivityDisclosureActorListPurposeProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>();
  const { showNotification } = useNotifications();
  const { debouncedSearch, onSearch } = useSearch();

  const { data, isLoading } =
    useListActivityUseAndPublishPurpose({
      activityId,
      search: debouncedSearch ?? purposeId,
    });

  const filterKey = data?.data.filter(
    (v) => !keyDisable?.includes(v.purposeID)
  );

  const updateDisclosureActorOfActivity =
    useUpdateDisclosureActorOfActivity({
      activityId,
      actorId,
      onSuccess: async () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.activity.useAndPublic.disclosure.update'
          ) as string,
        });

        await queryClient.invalidateQueries([
          dataMappingQueryKeys.activity.disclosurePurposeDestination(
            activityId,
            purposeId
          ),
        ]);

        if (value) {
          await queryClient.invalidateQueries([
            dataMappingQueryKeys.activity.disclosurePurposeDestination(
              activityId,
              value
            ),
          ]);
        }
      },
    });

  const options = filterKey?.map((purpose) => ({
    label: purpose.name,
    value: purpose.purposeID,
  }));

  const onChange = (controllerPurposeId: string) => {
    setValue(controllerPurposeId);
    setTimeout(
      () =>
        updateDisclosureActorOfActivity.submit(
          controllerPurposeId
        ),
      1000
    );
  };

  return (
    <Select
      showSearch
      loading={
        isLoading ||
        updateDisclosureActorOfActivity.isLoading
      }
      disabled={updateDisclosureActorOfActivity.isLoading}
      onSearch={onSearch}
      value={value ?? purposeId}
      options={options}
      className="w-100"
      onChange={onChange}
    />
  );
};
