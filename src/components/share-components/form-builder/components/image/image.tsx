import { Image, Empty } from 'antd';
import * as React from 'react';
export type ImageProps = {
  value: string;
  id: string;
};

export const Images = (props: ImageProps) => {
  const [error, setError] = React.useState(false);

  return (
    <>
      <div>
        {error === false ? (
          <>
            <Image
              src={`https://unifence-bucket-prod.s3.ap-southeast-1.amazonaws.com/location/${props.id}/${props.value}`}
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
