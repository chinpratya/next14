import { ReactNode } from 'react';

export type NavigationType = {
  label: string;
  key: string;
  icon?: ReactNode;
  type?: 'item' | 'group' | 'collapse';
  urlParam?: string | null;
  disabled?: boolean;
  children?: NavigationType[];
  permissions?: string[];
  query?: any;
};
