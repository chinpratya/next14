import { Button, Modal } from 'antd';
import * as React from 'react';

import { type VideoType } from './type';

export type VideoLiveProps = VideoType;

export const VideoLive = (props: VideoLiveProps) => {
  const [open, setOpen] = React.useState(false);

  const iframeRef =
    React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    const handleIframeError = () => {
      console.error('Error loading iframe content');
    };

    const iframeElement = iframeRef.current;

    if (iframeElement) {
      iframeElement.addEventListener(
        'error',
        handleIframeError
      );
    }

    return () => {
      if (iframeElement) {
        iframeElement.removeEventListener(
          'error',
          handleIframeError
        );
      }
    };
  }, []);
  return (
    <>
      <div>
        <Button block onClick={() => setOpen(true)}>
          {'ดูกล้อง'}
        </Button>
        <Modal
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          bodyStyle={{ height: 600 }}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            src={
              (props?.value?.map(
                (value) => value
              )[0] as string) ||
              'http://cctv.devdog.blog/pages/player/embedded/150615211533150542/0'
            }
          ></iframe>
        </Modal>
      </div>
    </>
  );
};
