import { MenuOutlined } from '@ant-design/icons';
import { Grid, Drawer } from 'antd';
import React, { useState } from 'react';

import utils from 'src/utils';

const { useBreakpoint } = Grid;

interface InnerAppLayoutProps {
  sideContent?: React.ReactNode;
  sideContentWidth?: number;
  border?: boolean;
  children?: React.ReactNode;
  mainContent?: React.ReactNode;
  pageHeader?: boolean;
  sideContentGutter?: boolean;
  loading?: boolean;
}

const SideContent: React.FC<InnerAppLayoutProps> = (
  props
) => {
  const {
    sideContent,
    sideContentWidth = 250,
    border,
  } = props;
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

interface SideContentProps extends InnerAppLayoutProps {
  visible: boolean;
  onSideContentClose: () => void;
  loading?: boolean;
}

const SideContentMobile: React.FC<SideContentProps> = (
  props
) => {
  const { sideContent, visible, onSideContentClose } =
    props;
  return (
    <Drawer
      width={320}
      placement="left"
      closable={false}
      onClose={onSideContentClose}
      open={visible}
      bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <div className="h-100">{sideContent}</div>
    </Drawer>
  );
};

export const InnerAppLayout: React.FC<
  InnerAppLayoutProps
> = (props) => {
  const {
    mainContent,
    pageHeader,
    sideContentGutter = true,
  } = props;
  const isMobile = !utils
    .getBreakPoint(useBreakpoint())
    .includes('lg');
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
  };

  const openSideContentMobile = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="inner-app-layout">
        {isMobile ? (
          <SideContentMobile
            visible={visible}
            onSideContentClose={close}
            {...props}
          />
        ) : (
          <SideContent {...props} />
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
    </>
  );
};

export default InnerAppLayout;
