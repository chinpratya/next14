import { dsarAutomationDashboardHandlers } from './dashboard';
import { dsarAutomationRequestHandlers } from './request';
import { dsarAutomationTagsHandlers } from './tags';
import { dsarAutomationTaskHandlers } from './task';
import { dsarAutomationWebformHandlers } from './webform';
import { dsarAutomationWorkFlowHandlers } from './workflow';

export const dsarAutomationHandlers = [
  ...dsarAutomationRequestHandlers,
  ...dsarAutomationTagsHandlers,
  ...dsarAutomationTaskHandlers,
  ...dsarAutomationWebformHandlers,
  ...dsarAutomationWorkFlowHandlers,
  ...dsarAutomationDashboardHandlers,
];
