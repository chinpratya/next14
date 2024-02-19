import { permission } from './../testing/test-data/organization/permission';
import { ReactNode } from 'react';

export type AppConfig = {
  title: string;
  id: string;
  logo?: string | ReactNode;
  description: string;
  path: string;
  permission?: string;
};

export type AppsConfig = AppConfig[];

export type ModuleConfig = AppConfig & {
  appId:
    | 'datafence'
    | 'cyberfence'
    | 'physicalManagement'
    | 'centralManagement';
};

export type ModulesConfig = ModuleConfig[];
