import { FieldInfo } from '@/types';
import { Widget } from '@/types/form-builder';
import {
  LongTextIcons,
  ShortTextIcons,
  MatrixIcons,
  MatrixMixedIcons,
  CheckBoxIcons,
  RadioBoxIcons,
  FromDataIcons,
  QuestionGroupIcons,
  StatementIcons,
} from '@utilComponents/icon/form-builder-icons';

export const fieldsInfo: Record<Widget, FieldInfo> = {
  'long-text': {
    icon: <LongTextIcons />,
    key: 'long-text',
    title: 'ข้อความยาว',
    color: '#96d3ff',
  },
  'short-text': {
    icon: <ShortTextIcons />,
    key: 'short-text',
    title: 'ข้อความสั้น',
    color: '#559af4',
  },
  matrix: {
    icon: <MatrixIcons />,
    key: 'matrix',
    title: 'เมทริกซ์',
    color: '#f6db7a',
  },
  'matrix-mix': {
    icon: <MatrixMixedIcons />,
    key: 'matrix-mix',
    title: 'เมทริกซ์(ปรับแต่ง)',
    color: '#f4d057',
  },
  'check-box': {
    icon: <CheckBoxIcons />,
    key: 'check-box',
    title: 'ปรนัยหลายตัวเลือก',
    color: '#c76397',
  },
  'radio-box': {
    icon: <RadioBoxIcons />,
    key: 'radio-box',
    title: 'ปรนัยหนึ่งตัวเลือก',
    color: '#d389b1',
  },
  'from-data': {
    icon: <FromDataIcons />,
    key: 'from-data',
    title: 'รับค่ามา',
    color: '#d389b1',
  },
  'question-group': {
    icon: <QuestionGroupIcons />,
    key: 'question-group',
    title: 'กลุ่มคำถาม',
    color: '#f4d057',
  },
  statement: {
    icon: <StatementIcons />,
    key: 'statement',
    title: 'คำแถลง',
    color: '#eea54e',
  },
  'form-data': {
    icon: <FromDataIcons />,
    key: 'form-data',
    title: 'รับค่ามา',
    color: '#d389b1',
  },
};
