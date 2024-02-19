import { rest } from 'msw';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';

import { db } from '../../../db';

const getConsentManagementPurposeHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/purpose/:purposeId`,
  (req, res, ctx) => {
    const purposeId = req.params.purposeId as string;

    const purpose = db.dataMappingPurpose.findFirst({
      where: {
        purposeID: {
          equals: purposeId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: purpose,
      })
    );
  }
);

const getConsentManagementPurposeMetaHandler = rest.get(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/meta/purpose`,
  (req, res, ctx) => {
    const meta = testData.consentManagement.purpose.meta;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: meta,
      })
    );
  }
);

const updateConsentManagementPurposeInitHandler =
  rest.put(
    `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/purpose/init/:purposeId`,
    async (req, res, ctx) => {
      const purposeId = req.params.purposeId as string;
      const data = await req.json();

      const purpose = db.dataMappingPurpose.findFirst({
        where: {
          purposeID: {
            equals: purposeId,
          },
        },
      });

      db.dataMappingPurpose.update({
        where: {
          purposeID: {
            equals: purposeId,
          },
        },
        data: {
          ...purpose,
          ...data,
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

const updateConsentManagementPurposeHandler = rest.put(
  `${API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL}/purpose/:purposeId`,
  async (req, res, ctx) => {
    const purposeId = req.params.purposeId as string;
    const data = await req.json();

    const purpose = db.dataMappingPurpose.findFirst({
      where: {
        purposeID: {
          equals: purposeId,
        },
      },
    });
    const group = db.dataMappingGroup.findFirst({
      where: {
        groupID: {
          equals: data.groupID,
        },
      },
    });
    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });

    db.dataMappingPurpose.update({
      where: {
        purposeID: {
          equals: purposeId,
        },
      },
      data: {
        ...data,
        group: group?.name ?? '',
        groupID: group?.groupID ?? '',
        organization: organization?.department_name ?? '',
        organizationID: organization?.departmentId ?? '',
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
        version: purpose ? 1 : 2,
      },
    });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);
export const consentManagementPurposeHandlers = [
  getConsentManagementPurposeHandler,
  getConsentManagementPurposeMetaHandler,
  updateConsentManagementPurposeInitHandler,
  updateConsentManagementPurposeHandler,
];
