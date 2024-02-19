import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import { complianceHandlers } from './assessment-automation';
import { consentManagementHandlers } from './consent-management';
import { cookieManagementHandlers } from './cookie-management';
import { coreHandlers } from './core';
import { dataMappingHandlers } from './data-mapping';
import { dsarAutomationHandlers } from './dsar-automation';
import { metaHandlers } from './meta';
import { optionHandlers } from './option';
import { organizationHandlers } from './organization';
import { policyManagementHandlers } from './policy-management';

export const handlers = [
  ...complianceHandlers,
  ...consentManagementHandlers,
  ...cookieManagementHandlers,
  ...coreHandlers,
  ...dataMappingHandlers,
  ...dsarAutomationHandlers,
  ...metaHandlers,
  ...optionHandlers,
  ...organizationHandlers,
  ...policyManagementHandlers,
  rest.get(`${API_URL}/healthcheck`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ healthy: true })
    );
  }),
];
