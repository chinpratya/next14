import { Drawer } from 'antd';

import { tokens } from '@/lang';
import { ConsentForm } from '@/shared';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetWebformVersion } from '../../api/get-webform-version';

export type WebformVersionPreviewProps = {
  open: boolean;
  onClose: () => void;
  webformId?: string;
  versionId?: string;
};

export const WebformVersionPreview = ({
  open,
  onClose,
  webformId,
  versionId,
}: WebformVersionPreviewProps) => {
  const { data, isLoading, isError } =
    useGetWebformVersion({
      webformId: webformId ?? '',
      versionId: versionId ?? '',
    });

  return (
    <Drawer
      title={<IntlMessage id={tokens.common.preview} />}
      placement="right"
      open={open}
      onClose={onClose}
      width={1200}
    >
      <FallbackError isError={isError}>
        <ConsentForm
          formItems={data?.formItems ?? []}
          formSettings={data?.formSetting}
          formConditions={data?.formConditions}
          isLoading={isLoading}
          viewOnly={true}
        />
      </FallbackError>
    </Drawer>
  );
};
