import FileSaver from 'file-saver';
import _ from 'lodash';
import { useState } from 'react';

import { getActivityPreview } from '../../../api/get-activity-preview';
import { exportActivityToPdf } from '../../../shared';

export type UseExportActivitiesToPdf = {
  selectedActivities: string[];
  onSuccess?: () => void;
};

export const useExportActivitiesToPdf = ({
  selectedActivities,
  onSuccess,
}: UseExportActivitiesToPdf) => {
  const [isLoading, setLoading] =
    useState<boolean>(false);

  async function urlToBlob(url: URL): Promise<Blob> {
    const response = await fetch(url);
    return await response.blob();
  }

  const onExport = async () => {
    try {
      setLoading(true);
      const activitiesName: string[] = [];
      const exportBlobURLFilesPromises =
        selectedActivities.map(async (activityId) => {
          const activity = await getActivityPreview(
            activityId
          );
          activitiesName.push(activity.name);
          return await exportActivityToPdf(
            activityId,
            activity
          );
        });
      const exportBlobURLFiles: Array<URL> =
        await Promise.all(exportBlobURLFilesPromises);

      const JSZip = (await import('jszip')).default;

      const zip = new JSZip();
      exportBlobURLFiles.forEach((blob, index) => {
        zip.file(
          `กิจกรรม ${_.get(
            activitiesName,
            index,
            index
          )}.pdf`,
          urlToBlob(blob)
        );
      });

      zip
        .generateAsync({ type: 'blob' })
        .then(function (content) {
          FileSaver.saveAs(content, 'ส่งออกกิจกรรม.zip');
        });

      setLoading(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return {
    onExport,
    isLoading,
  };
};
