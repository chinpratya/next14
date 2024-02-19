import { css } from '@emotion/css';
import { useClipboard } from '@mantine/hooks';
import { ReactNode } from 'react';

type DocumentationTagProps = {
  label?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export const DocumentationTag = ({
  label,
  children,
  onClick,
}: DocumentationTagProps) => {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <div
      className={css`
        display: inline-block;
        padding: 0 12px;
        height: 25px;
        color: #ff6b72;
        background-color: #f7f7f8;
        border-radius: 5px;
        border: 1px solid
          ${clipboard.copied ? '#ff6b72' : '#e6ebf1'};
        cursor: pointer;
        margin: 0 8px;
        transition: 0.3s;

        a {
          color: #ff6b72;
        }
      `}
      onClick={() => {
        onClick?.();
        clipboard.copy(label);
      }}
    >
      {children ? children : label}
    </div>
  );
};
