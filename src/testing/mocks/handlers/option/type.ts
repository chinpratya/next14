import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL } from '@/config/endpoint';
import { API_ENDPOINT_ONEFENCE_BASE_URL } from '@/config/endpoint-test';

import { db } from '../../db';

const listOptionTypeHandler = rest.get(
  `${API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL}/option/:type`,
  async (req, res, ctx) => {
    const type = req.params.type as string;

    const data = db.optionType.findMany({
      where: {
        type: {
          equals: type,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        message: 'success',
        data,
      })
    );
  }
);

const createOptionTypeHandler = rest.post(
  `${API_ENDPOINT_ONEFENCE_BASE_URL}/option/:type`,
  async (req, res, ctx) => {
    const type = req.params.type as string;
    const data = await req.json();

    db.optionType.create({
      ...data,
      createdBy: 'Admin',
      createdDt: new Date().toISOString(),
      description: data.description ?? '',
      ObjectUUID: uuid(),
      type,
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

export const optionTypeHandlers = [
  listOptionTypeHandler,
  createOptionTypeHandler,
];
