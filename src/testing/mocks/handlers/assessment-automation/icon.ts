import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../db';

const getComplianceIconsHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/icon`,
  (req, res, ctx) => {
    const icons = db.complianceIcon.getAll();

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
        data: icons,
      })
    );
  }
);

const createComplianceIconHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/icon`,
  async (req, res, ctx) => {
    const { fileID, fileName } = await req.json();

    if (!fileID || !fileName) {
      return res(
        ctx.status(400),
        ctx.delay(3000),
        ctx.json({
          code: 400,
          message: 'fileID and fileName are required',
        })
      );
    }

    db.complianceIcon.create({
      ObjectUUID: uuid(),
      fileID,
      fileName,
      createdBy: 'test',
      createdDt: new Date().toISOString(),
    });

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const deleteComplianceIconHandler = rest.delete(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/icon/:iconId`,
  (req, res, ctx) => {
    const iconId = req.params.iconId as string;

    db.complianceIcon.delete({
      where: {
        ObjectUUID: {
          equals: iconId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

export const complianceIconHandlers = [
  getComplianceIconsHandler,
  createComplianceIconHandler,
  deleteComplianceIconHandler,
];
