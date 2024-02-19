import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  Document,
  MARKS,
  BLOCKS,
  Block,
  Inline,
} from '@contentful/rich-text-types';
import { Skeleton } from 'antd';
import { Fragment, ReactNode } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { useGetDocument } from '@/features/shared';

import { CodePreview } from '../code-preview';

type ContentfulRichTextRenderProps = {
  entryId: string;
};

export const ContentfulRichTextRender = ({
  entryId,
}: ContentfulRichTextRenderProps) => {
  const { data, isError, isLoading } = useGetDocument({
    entryId,
  });

  const options = {
    renderMark: {
      [MARKS.CODE]: (code: ReactNode) => (
        <CodePreview
          disabledCopy={true}
          code={code as string}
        />
      ),
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          src={node.data.target.fields.file.url}
          className="w-100"
          style={{ maxWidth: 700 }}
        />
      ),
    },
  };

  if (isLoading)
    return <Skeleton paragraph={{ rows: 5 }} />;

  return (
    <FallbackError isError={isError}>
      <Fragment>
        {documentToReactComponents(
          data as Document,
          options
        )}
      </Fragment>
    </FallbackError>
  );
};
