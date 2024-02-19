import { css } from '@emotion/css';
import { ReactNode } from 'react';

export type PreviewDeviceWrapperProps = {
  elementWidth: number;
  children?: ReactNode;
};

export const PreviewDeviceWrapper = ({
  children,
  elementWidth,
}: PreviewDeviceWrapperProps) => {
  const scaleDesktop = elementWidth / 1980;
  const scaleTablet = elementWidth / 768;
  const scaleMobile = elementWidth / 375;

  return (
    <div
      className={css`
        .device {
          width: 100%;
          display: block;
          background: #ccd6e0;
          iframe {
            border: 0;
            pointer-events: none;
          }
        }
        .desktop {
          height: calc(${elementWidth}px / 16 * 9);
          iframe {
            width: 1980px;
            height: 1080px;
            transform: scale(${scaleDesktop});
            transform-origin: 0 0;
          }
        }
        .tablet {
          height: 500px;

          iframe {
            width: 768px;
            height: 1024px;
            transform: scale(${scaleTablet});
            transform-origin: 0 0;
          }
        }
        .mobile {
          height: 475px;

          iframe {
            width: 375px;
            height: 667px;
            transform: scale(${scaleMobile});
            transform-origin: 0 0;
          }
        }
      `}
    >
      {children}
    </div>
  );
};
