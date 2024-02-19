import { coreReportChartsHandlers } from './charts';
import { coreReportTablesHandlers } from './tables';
import { coreReportWidgetsHandlers } from './widgets';

export const coreReportHandlers = [
  ...coreReportTablesHandlers,
  ...coreReportChartsHandlers,
  ...coreReportWidgetsHandlers,
];
