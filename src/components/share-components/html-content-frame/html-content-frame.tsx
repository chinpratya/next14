import { useEffect, useRef } from 'react';

export type HtmlContentFrameProps = {
  html: string;
  height?: string;
};

export const HtmlContentFrame = ({
  html,
  height = '100vh',
}: HtmlContentFrameProps) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (
      frameRef.current &&
      frameRef.current.contentWindow
    ) {
      const doc = frameRef.current.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html]);

  return (
    <iframe
      ref={frameRef}
      style={{
        width: '100%',
        height: height,
        border: 'none',
      }}
    />
  );
};
