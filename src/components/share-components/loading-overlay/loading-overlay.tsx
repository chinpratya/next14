import {
  LoadingOverlay as MantineLoadingOverlay,
  LoadingOverlayProps as Props,
} from '@mantine/core';

import { Loading } from '../loading/loading';

export type LoadingOverlayProps = Props;

export const LoadingOverlay = (
  props: LoadingOverlayProps
) => {
  return (
    <MantineLoadingOverlay
      loader={<Loading />}
      {...props}
    />
  );
};
