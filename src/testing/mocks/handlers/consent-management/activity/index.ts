import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

import { consentManagementActivityPreviewHandlers } from './preview';
import { consentManagementActivityPurposeHandlers } from './purpose';

const updateConsentManagementActivityHandler = rest.put(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/activity/:activityId`,
  async (req, res, ctx) => {
    const activityId = req.params.activityId as string;
    const body = await req.json();

    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: body.organizationID as string,
          },
        },
      });

    const group = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: body.groupID as string,
        },
      },
    });

    const dataSubject = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: body.dataSubjectID as string,
        },
      },
    });

    db.dataMappingActivity.update({
      where: {
        ObjectUUID: {
          equals: activityId,
        },
      },
      data: {
        ...body,
        organization: organization?.department_name,
        group: group?.name,
        dataSubject: dataSubject?.name,
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

export const consentManagementActivityHandlers = [
  ...consentManagementActivityPurposeHandlers,
  ...consentManagementActivityPreviewHandlers,
  updateConsentManagementActivityHandler,
];
