import { Button } from 'antd';
import React, { useState } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';

import { exportActivityToPdf } from '../../shared';
import { ActivityPreview } from '../../types';

export type ActivityPreviewDataExportProps = {
  activityId: string;
  data?: ActivityPreview;
  disabled?: boolean;
  dataLifecycleRef?: React.RefObject<HTMLDivElement>;
};

export const ActivityPreviewDataExport = ({
  activityId,
  data,
  disabled,
  dataLifecycleRef,
}: ActivityPreviewDataExportProps) => {
  const [loading, setLoading] = useState(false);
  const onExportPDF = async () => {
    if (data) {
      try {
        setLoading(true);
        const pdf = await exportActivityToPdf(
          activityId,
          data,
          dataLifecycleRef
        );
        setLoading(false);
        window.open(pdf, '_blank');
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      type="link"
      disabled={disabled}
      onClick={onExportPDF}
      className="p-0 mr-2"
      loading={loading}
    >
      <IntlMessage id="dataMapping.activity.preview.downloadPDF" />
    </Button>
  );
};
