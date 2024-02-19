import React from 'react';

export type FlexProps = {
  alignItems?:
    | 'start'
    | 'end'
    | 'center'
    | 'baseline'
    | 'stretch';
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly';
  mobileFlex?: boolean;
  flexDirection?:
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse';
  children?: React.ReactNode | string | null;
  className?: string;
};

export const Flex = ({
  children,
  className,
  alignItems,
  justifyContent,
  mobileFlex = true,
  flexDirection = 'row',
}: FlexProps) => {
  const getFlexResponsive = () =>
    mobileFlex ? 'd-flex' : 'd-md-flex';
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? 'flex-' + flexDirection : ''
      } ${
        alignItems ? 'align-items-' + alignItems : ''
      } ${
        justifyContent
          ? 'justify-content-' + justifyContent
          : ''
      }`}
    >
      {children}
    </div>
  );
};
