import React from 'react';

export type IconType = {
  type: React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  className?: string;
};

export const Icon = ({ type, className }: IconType) => {
  return (
    <>
      {React.createElement(type, {
        className: className,
      })}
    </>
  );
};
