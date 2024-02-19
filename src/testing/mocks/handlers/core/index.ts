import { coreNotifyHandlers } from './notify';
import { coreReportHandlers } from './report';

export const coreHandlers = [
  ...coreReportHandlers,
  ...coreNotifyHandlers,
];
