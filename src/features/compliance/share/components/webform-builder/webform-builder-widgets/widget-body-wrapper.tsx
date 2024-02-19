import React from 'react';

export type WidgetBodyWrapperProps = {
  readOnly?: boolean;
  children: React.ReactNode;
};

export const WidgetBodyWrapper = ({
  readOnly,
  children,
}: WidgetBodyWrapperProps) => {
  return (
    <div
      style={{
        cursor: readOnly ? 'not-allowed' : 'auto',
      }}
    >
      <div
      // style={{
      //   pointerEvents: readOnly ? 'none' : 'auto',
      // }}
      >
        {children}
      </div>
    </div>
  );
};
