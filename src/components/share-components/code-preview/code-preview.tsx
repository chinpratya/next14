import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { useClipboard } from '@mantine/hooks';
import { Button } from 'antd';
import { CodeBlock, dracula } from 'react-code-blocks';

export type CodePreviewProps = {
  code?: string;
  language?: string;
  top?: number;
  right?: number;
  disabledCopy?: boolean;
  disabled?: boolean;
};

export const CodePreview = ({
  code = '',
  language = 'javascript',
  top = 20,
  right = 20,
  disabledCopy = false,
  disabled = false,
}: CodePreviewProps) => {
  const { copy, copied } = useClipboard({
    timeout: 1000,
  });

  return (
    <div
      className={css`
        display: block;

        code {
          font-size: 14px !important;
          line-height: 28px !important;
          font-weight: normal !important;
          font-family: Consolas, Monaco, 'Andale Mono',
            monospace !important;
          border: none;
          color: ${disabled ? '#72849A' : '#fff'};
          background-color: ${disabled
            ? '#F7F7F8'
            : 'rgb(40, 42, 54)'};
          padding: 24px !important;
        }

        .btn-copy {
          position: absolute;
          top: ${top}px;
          right: ${right}px;
          border: none;
          background-color: transparent;
          color: ${disabled ? '#000' : '#fff'};
          display: ${disabledCopy ? 'none' : 'block'};

          .checked-copy {
            color: #52c41a;
          }
        }

        span {
          background-color: ${disabled
            ? '#F7F7F8 !important'
            : 'unset'};
        }
      `}
    >
      <Button
        className="btn-copy"
        onClick={() => copy(code)}
        disabled={false}
      >
        {copied ? (
          <CheckOutlined className="checked-copy" />
        ) : (
          <CopyOutlined />
        )}
      </Button>
      <CodeBlock
        text={code}
        language={language}
        theme={dracula}
        showLineNumbers={false}
        wrapLines={true}
        codeBlock
      />
    </div>
  );
};
