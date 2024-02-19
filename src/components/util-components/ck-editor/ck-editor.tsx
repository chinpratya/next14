import { CKEditor } from '@ckeditor/ckeditor5-react';
import { css } from '@emotion/css';
import SPClassicEditor from 'sp-ckeditor5-classic';

export type CkEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  maxHeight?: string;
};

export const CkEditor = ({
  value = '<p></p>',
  onChange,
  disabled = false,
  maxHeight = 'auto',
}: CkEditorProps) => {
  return (
    <div
      className={css`
        .ck-editor__editable_inline {
          min-height: 200px;
          border: none !important;
          max-height: ${maxHeight};
        }

        .ck-toolbar {
          background-color: #f7f7f8 !important;
          border-top: 1px solid #e8e8e8 !important;
          border-right: 1px solid #e8e8e8 !important;
          border-left: 1px solid #e8e8e8 !important;
          border-bottom: none !important;
          border-top-left-radius: 0.625rem !important;
          border-top-right-radius: 0.625rem !important;
        }

        .ck-content {
          border: 1px solid #e8e8e8 !important;
          border-bottom-left-radius: 0.625rem !important;
          border-bottom-right-radius: 0.625rem !important;
        }
      `}
    >
      <CKEditor
        editor={SPClassicEditor as any}
        data={value as string}
        onChange={(event, editor: any) => {
          const data = editor.getData();
          onChange?.(data);
        }}
        config={{
          fontSize: {
            options: [
              9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26,
              28, 30, 32,
            ],
            supportAllValues: true,
          },
        }}
        disabled={disabled}
      />
    </div>
  );
};
