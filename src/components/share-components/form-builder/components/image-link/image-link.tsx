import { Image, Empty } from 'antd';
import * as React from 'react';
export type ImageLinkProps = {
  id: string;
};

export const ImagesLink = (props: ImageLinkProps) => {
  const [error, setError] = React.useState(false);
  console.log(props);
  return (
    <>
      <div>
        {error === false ? (
          <>
            <Image
              src={props?.id}
              alt="ss"
              onError={() => setError(true)}
              preview={{
                width: '50%',
                height: '50%',
              }}
            />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
