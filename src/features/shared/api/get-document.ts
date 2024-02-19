import { Document } from '@contentful/rich-text-types';
import { useQuery } from '@tanstack/react-query';

import { contentfulClient } from '@/lib/contentful-client';

type GetDocument = {
  entryId: string;
};

export const getDocument = async ({
  entryId,
}: GetDocument): Promise<Document> => {
  const response = await contentfulClient.getEntry(
    entryId
  );
  return response.fields.documentRichText as Document;
};

type UseGetDocument = GetDocument;

export const useGetDocument = ({
  entryId,
}: UseGetDocument) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: ['document', entryId],
      queryFn: () => getDocument({ entryId }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
