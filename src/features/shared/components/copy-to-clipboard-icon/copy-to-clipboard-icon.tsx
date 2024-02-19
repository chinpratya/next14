import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { useClipboard } from '@mantine/hooks';

type CopyToClipboardIconProps = {
  text: string;
};

export const CopyToClipboardIcon = ({
  text = '',
}: CopyToClipboardIconProps) => {
  const clipboard = useClipboard();

  const onCopy = () => clipboard.copy(text);

  if (clipboard.copied)
    return (
      <CheckOutlined
        className={css`
          color: #7e62ff;
        `}
      />
    );

  return (
    <CopyOutlined
      onClick={onCopy}
      className={css`
        cursor: pointer;
        color: #455560;
      `}
    />
  );
};
