import { Flex } from '@mantine/core';
import { useRef } from 'react';

import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataLifecycleFlow,
  useGetDataLifecycleByActivity,
} from '../../../data-lifecycle';
import { useGetActivityPreview } from '../../api/get-activity-preview';
import { ActivityPreviewDataPrivacyPolicy } from '../activity-preview-data-privacy-policy';

import { ActivityPreviewDataCategories } from './activity-preview-data-categories';
import { ActivityPreviewDataExport } from './activity-preview-data-export';
import { ActivityPreviewDataInfo } from './activity-preview-data-info';
import { ActivityPreviewDataPurpose } from './activity-preview-data-purpose';
import { ActivityPreviewDataTransfer } from './activity-preview-data-transfer';

export type ActivityPreviewDataProps = {
  activityId: string;
  open: boolean;
  onClose: () => void;
};

export const ActivityPreviewData = ({
  activityId,
  open,
  onClose,
}: ActivityPreviewDataProps) => {
  const dataLifecycleRef = useRef<HTMLDivElement>(null);

  const dataLifecycleByActivity =
    useGetDataLifecycleByActivity({
      activityId,
    });

  const preview = useGetActivityPreview({
    activityId,
    isCallData: open,
  });

  return (
    <Modal
      title={
        <Flex
          align="center"
          justify="space-between"
          className="mr-4"
        >
          <IntlMessage id="dataMapping.activity.preview.title" />
          <ActivityPreviewDataExport
            activityId={activityId}
            disabled={preview.isLoading}
            data={preview.data}
            dataLifecycleRef={dataLifecycleRef}
          />
        </Flex>
      }
      open={open}
      onCancel={() => onClose()}
      footer={null}
      width="90vw"
      loading={
        preview.isLoading ||
        dataLifecycleByActivity.isLoading
      }
      destroyOnClose
    >
      <FallbackError isError={preview.isError}>
        <ActivityPreviewDataInfo data={preview.data} />
        <ActivityPreviewDataCategories
          data={preview.data}
        />
        <ActivityPreviewDataPurpose data={preview.data} />
        <ActivityPreviewDataTransfer
          data={preview.data}
        />
        <ActivityPreviewDataPrivacyPolicy
          data={preview.data}
        />
        {!dataLifecycleByActivity.isError &&
        !dataLifecycleByActivity.isLoading ? (
          <>
            <div className="mt-4" />
            <div ref={dataLifecycleRef}>
              <DataLifecycleFlow
                dataLifecycleId={
                  dataLifecycleByActivity.data
                    ?.dataLifeCycleID as string
                }
              />
            </div>
          </>
        ) : null}
      </FallbackError>
    </Modal>
  );
};
