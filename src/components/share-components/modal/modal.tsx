import { css } from '@emotion/css';
import {
  Modal as AntdModal,
  ModalProps as AntdModalProps,
  Skeleton,
} from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';
import { useMediaQuery } from '@mantine/hooks';

export type ModalProps = AntdModalProps & {
  bodyPadding?: number;
  loading?: boolean;
  isError?: boolean;
  minHeight?: string;
  borderLess?: boolean;
};

export const Modal = ({
  children,
  width = 750,
  bodyPadding = 24,
  loading,
  minHeight,
  isError = false,
  borderLess = false,
  ...rest
}: ModalProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AntdModal
      width={isMobile ? '100vw' : width}
      centered
      {...rest}
      className={css`
        .ant-modal-header {
          border-bottom: ${borderLess
            ? 'none'
            : '1px solid #e6ebf1'};
        }

        .ant-modal-footer {
          border-top: ${borderLess
            ? 'none'
            : '1px solid #e6ebf1'};
        }

        .ant-modal-body {
          min-height: ${minHeight ?? 'auto'};
          max-height: 80vh;
          overflow-y: auto;
          padding: ${bodyPadding}px;

          .ant-form-item-label > label {
            width: 100%;
          }
        }
      `}
    >
      <FallbackError isError={isError}>
        {loading ? <Skeleton /> : children}
      </FallbackError>
    </AntdModal>
  );
};
