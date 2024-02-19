import { useMediaQuery } from '@mantine/hooks';

import { tokens } from '@/lang';
import { ConsentForm } from '@/shared';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetRequestForm } from '../../api/get-request-form';

export type RequestFormModalProps = {
  requestId?: string;
  open?: boolean;
  onClose?: () => void;
};

export const RequestFormModal = ({
  requestId,
  open,
  onClose,
}: RequestFormModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data, isLoading, isError } = useGetRequestForm(
    requestId ?? ''
  );

  return (
    <Modal
      title={
        <IntlMessage
          id={tokens.dataBreach.request.requestForm}
        />
      }
      open={open}
      width={isMobile ? '100%' : '80%'}
      onCancel={onClose}
      footer={null}
    >
      <FallbackError isError={isError}>
        <ConsentForm
          isLoading={isLoading}
          isFullHeight
          formSettings={data?.formTemplate?.formSetting}
          formItems={data?.formTemplate?.formItems ?? []}
          viewOnly
        />
      </FallbackError>
    </Modal>
  );
};
