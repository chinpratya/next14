import { css } from '@emotion/css';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export type ConsentStyleWrapperProps = {
  pageSetting?: Record<string, unknown>;
  children?: React.ReactNode;
  isFullHeight?: boolean;
  paddingLevel?: 0 | 1 | 2 | 3 | 4;
};

export const ConsentStyleWrapper = ({
  pageSetting,
  children,
  isFullHeight,
  paddingLevel = 4,
}: ConsentStyleWrapperProps) => {
  const currentPageStyle =
    pageSetting?.style ?? 'style-1';

  const backgroundStyle =
    pageSetting?.backgroundStyle ?? 'image';
  const backgroundImage =
    pageSetting?.backgroundImage ?? '';
  const backgroundColor =
    pageSetting?.backgroundColor ?? '#fff';

  return (
    <div
      className={css`
        .consent-builder-page {
          background: ${backgroundStyle === 'image'
            ? `url(${backgroundImage as string})
                no-repeat center center fixed
            `
            : (backgroundColor as string)};
          background-size: cover;
        }

        .consent-builder-page-style-2 {
          .consent-builder-form-selected {
            border: 1px solid #e8e8e8 !important;
            background: #fff !important;
          }

          .ant-card-bordered {
            border: none;
            background: none;
          }
        }
      `}
    >
      <div
        className={`consent-builder-page consent-builder-page-${
          currentPageStyle as string
        }`}
      >
        {isFullHeight ? (
          <div className="p-4">{children}</div>
        ) : (
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{
              height: '100vh',
              minHeight: 750,
            }}
          >
            <div className={`p-${paddingLevel}`}>
              {children}
            </div>
          </Scrollbars>
        )}
      </div>
    </div>
  );
};
