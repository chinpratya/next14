import { Drawer } from 'antd';
import dynamic from 'next/dynamic';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type ContentEditorProps = {
  open: boolean;
  content?: string;
  onClose: () => void;
  onChange: (value: string) => void;
  type: 'header' | 'footer';
};

export const ContentEditor = ({
  open,
  content,
  type,
  onClose,
  onChange,
}: ContentEditorProps) => {
  return (
    <Drawer
      title={
        type === 'header'
          ? 'แก้ไขส่วนหัวของฟอร์ม'
          : 'แก้ไขส่วนท้ายของฟอร์ม'
      }
      open={open}
      onClose={() => onClose()}
      placement="right"
      width={750}
    >
      <CkEditor value={content} onChange={onChange} />
    </Drawer>
  );
};
