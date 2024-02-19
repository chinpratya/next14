import { audit } from './audit-log';
import { department } from './department';
import { group } from './group';
import { info } from './info';
import { level } from './level';
import {
  initPassword,
  initPasswordExternal,
} from './password';
import { permission } from './permission';
import { position } from './position';
import { prefix } from './prefix';
import { role } from './role';
import { users } from './user';

export const org = {
  department,
  info,
  level,
  group,
  position,
  prefix,
  role,
  users,
  audit,
  initPassword,
  initPasswordExternal,
  permission,
};
