import { organizationDetails } from './details';
import { permission } from './permission';
import { rules } from './rules';
import { teams } from './team';
import { user } from './user';
import { realUser } from './users';

export const organization = {
  details: organizationDetails,
  teams,
  rules,
  permission,
  realUser,
  user,
};
