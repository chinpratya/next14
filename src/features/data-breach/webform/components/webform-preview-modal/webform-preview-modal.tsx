import { Drawer } from 'antd';

import { tokens } from '@/lang';
import { ConsentForm } from '@/shared';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetWebformTemplate } from '../../api/get-webform-template';

export type WebformPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  webformId?: string;
};

export const WebformPreviewModal = ({
  open,
  onClose,
  webformId,
}: WebformPreviewModalProps) => {
  const { data, isError, isLoading } =
    useGetWebformTemplate(webformId ?? '');

  return (
    <Drawer
      title={<IntlMessage id={tokens.common.preview} />}
      open={open}
      onClose={onClose}
      width={1200}
    >
      <FallbackError isError={isError}>
        <div className="cursor-not-allowed">
          <ConsentForm
            isFullHeight
            viewOnly
            isLoading={isLoading}
            formSettings={data?.form?.formSetting}
            formItems={data?.form?.formItems}
            formConditions={data?.form?.formConditions}
            paddingLevel={1}
          />
        </div>
      </FallbackError>
    </Drawer>
  );
};
