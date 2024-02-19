import { Drawer, Skeleton } from 'antd';

import { HtmlContentFrame } from '@components/html-content-frame';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetPolicyVersionPreview } from '../../api/get-policy-version-preview';

export type PolicyVersionPreviewProps = {
  open: boolean;
  onClose: () => void;
  policyId?: string;
  versionId?: string;
};

export const PolicyVersionPreview = ({
  open,
  onClose,
  policyId,
  versionId,
}: PolicyVersionPreviewProps) => {
  const { data, isLoading, isError } =
    useGetPolicyVersionPreview({
      policyId: policyId ?? '',
      versionId: versionId ?? '',
    });

  return (
    <Drawer
      title="Preview"
      placement="right"
      open={open}
      onClose={onClose}
      width={1200}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="cursor-not-allowed">
            <HtmlContentFrame
              html={data as string}
              height="calc(100vh - 225px)"
            />
          </div>
        )}
      </FallbackError>
    </Drawer>
  );
};
