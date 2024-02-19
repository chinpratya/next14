import { HtmlContentFrame } from '@components/html-content-frame';

import { useGetWebformEventTemplate } from '../../api/get-webform-event-template';

export const WebformEventTemplate = () => {
  const { data, isLoading, isError } =
    useGetWebformEventTemplate();

  return (
    <HtmlContentFrame html={data as unknown as string} />
  );
};
