import { css } from '@emotion/css';

/* eslint-disable @next/next/no-img-element */
type DocumentationImageProps = {
  src?: string;
};

export const DocumentationImage = ({
  src,
}: DocumentationImageProps) => {
  return (
    <img
      className={css`
        max-width: 876px;
        width: 100%;
        height: auto;
        display: block;
        margin: 8px 0 12px;
      `}
      src={src}
      alt="documentation image"
      loading="lazy"
    />
  );
};
