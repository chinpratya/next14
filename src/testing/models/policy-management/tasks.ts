import { primaryKey } from '@mswjs/data';

export const policyManagementTasks = {
  ObjectUUID: primaryKey(String),
  ObjectID: String,
  general_info: {
    name: String,
    assignee: String,
    deadline: String,
  },
  policy: {
    policy_id: String,
    policy_name: String,
    policy_uuid: String,
  },
  change_status: {
    status: String,
    task_detail: String,
    comment: String,
  },
  created_dt: String,
  created_by: String,
  updated_at: String,
  updated_by: String,
};
