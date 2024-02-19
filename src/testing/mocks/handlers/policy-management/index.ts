import { policyManagementAssessmentsHandlers } from './assessments';
import { policyManagementPolicyDashboardHandlers } from './dashboard';
import { policyManagementPolicyHandlers } from './policy';
import { PolicyManagementTasksHandlers } from './tasks';

export const policyManagementHandlers = [
  ...policyManagementAssessmentsHandlers,
  ...policyManagementPolicyDashboardHandlers,
  ...policyManagementPolicyHandlers,
  ...PolicyManagementTasksHandlers,
];
