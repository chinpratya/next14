import {
  ChevronDoubleDownIconOutlined,
  ChevronDoubleUpIconOutlined,
  ChevronDownIconOutlined,
  ChevronUpIconOutlined,
  EqualIconOutlined,
} from '@/components/util-components/icon';

export const SERVERITY_LEVEL = {
  HIGHEST: 'highest',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  LOWER: 'lower',
} as const;

export type SeverityLevel =
  (typeof SERVERITY_LEVEL)[keyof typeof SERVERITY_LEVEL];

export const SEVERITY_ITEMS = {
  [SERVERITY_LEVEL.HIGHEST]: {
    label: 'สูงมาก',
    color: '#B42318',
    icon: <ChevronDoubleUpIconOutlined color="#B42318" />,
  },
  [SERVERITY_LEVEL.HIGH]: {
    label: 'สูง',
    color: '#F04438',
    icon: <ChevronUpIconOutlined color="#F04438" />,
  },
  [SERVERITY_LEVEL.MEDIUM]: {
    label: 'ปานกลาง',
    color: '#CE8312',
    icon: <EqualIconOutlined color="#CE8312" />,
  },
  [SERVERITY_LEVEL.LOW]: {
    label: 'ต่ำ',
    color: '#06AED4',
    icon: <ChevronDownIconOutlined color="#06AED4" />,
  },
  [SERVERITY_LEVEL.LOWER]: {
    label: 'ต่ำสุด',
    color: '#0E7090',
    icon: (
      <ChevronDoubleDownIconOutlined color="#0E7090" />
    ),
  },
} as const;
