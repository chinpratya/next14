import { ReactNode } from 'react';

export function HtmlWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{
        textAlign: 'start',
      }}
    >
      {children}
    </div>
  );
}
