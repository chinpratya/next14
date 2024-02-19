import { MenuOutlined } from '@ant-design/icons';
import { Grid, Drawer } from 'antd';
import { ReactNode, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import utils from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

const { useBreakpoint } = Grid;

export type SideContentProps = {
  sideContent: ReactNode;
  sideContentWidth?: number;
  border?: boolean;
};
const SideContent = ({
  sideContent,
  sideContentWidth = 250,
  border = false,
}: SideContentProps) => {
  return (
    <div
      className={`side-content ${
        border ? 'with-border' : ''
      }`}
      style={{ width: `${sideContentWidth}px` }}
    >
      {sideContent}
    </div>
  );
};

export type SideContentMobileProps = {
  sideContent: ReactNode;
  open: boolean;
  onSideContentClose: () => void;
};
const SideContentMobile = ({
  sideContent,
  open,
  onSideContentClose,
}: SideContentMobileProps) => {
  return (
    <Drawer
      width={320}
      placement="left"
      closable={false}
      onClose={onSideContentClose}
      open={open}
      bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <div className="h-100">{sideContent}</div>
    </Drawer>
  );
};

export type InnerAppLayoutProps = SideContentProps & {
  mainContent: ReactNode;
  pageHeader?: boolean;
  sideContentGutter?: boolean;
};

export const InnerAppLayout = ({
  mainContent,
  pageHeader = false,
  sideContentGutter = true,
  sideContent,
  sideContentWidth,
  border,
}: InnerAppLayoutProps) => {
  const isMobile = !utils
    .getBreakPoint(useBreakpoint())
    .includes('lg');
  const [visible, setVisible] = useState<boolean>(false);

  const close = () => {
    setVisible(false);
  };

  const openSideContentMobile = () => {
    setVisible(true);
  };

  return (
    <ErrorBoundary fallback={<FallbackError />}>
      <div className="inner-app-layout">
        {isMobile ? (
          <SideContentMobile
            open={visible}
            onSideContentClose={close}
            sideContent={sideContent}
          />
        ) : (
          <SideContent
            sideContent={sideContent}
            sideContentWidth={sideContentWidth}
            border={border}
          />
        )}
        <div
          className={`main-content ${
            pageHeader ? 'has-page-header' : ''
          } ${
            sideContentGutter ? 'gutter' : 'no-gutter'
          }`}
        >
          {isMobile ? (
            <div
              className={`font-size-lg mb-3 ${
                !sideContentGutter ? 'pt-3 px-3' : ''
              }`}
            >
              <MenuOutlined
                onClick={() => openSideContentMobile()}
              />
            </div>
          ) : null}
          {mainContent}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default InnerAppLayout;
