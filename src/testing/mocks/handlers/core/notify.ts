import { rest } from 'msw';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint-test';
import { uid } from '@/utils';

import { testData } from '../../../test-data';
import { db } from '../../db';

const getCoreNotifyHandler = rest.get(
  `${API_ENDPOINT_CYBERFENCE_BASE_URL}/core/notify`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pages_ize') || '10';
    const responseType =
      req.url.searchParams.get('response_type') || '';

    const result = db.coreNotify.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_date: 'desc',
      },
    });

    const totalRecord = db.coreNotify.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.ceil(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: '',
        data: responseType
          ? testData.core.coreNotify.list
          : result,
        link: {
          prev: 'string',
          next: 'string',
        },
        meta: {
          total_page: totalPage,
          current_page: parseInt(page),
          page_size: parseInt(pageSize),
        },
        status: 'OK',
      })
    );
  }
);

const getCoreNotifyByIdHandler = rest.get(
  `${API_ENDPOINT_CYBERFENCE_BASE_URL}/core/notify/:notifyId`,
  (req, res, ctx) => {
    const notifyId = req.params.notifyId as string;

    const notify = db.coreNotify.findFirst({
      where: {
        _id: {
          equals: notifyId,
        },
      },
    });

    if (!notify) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          error: {
            type: '',
            code: 1,
            message: 'data not found',
          },
          message: '',
          status: 'ERROR',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: '',
        data: notify,
        status: 'OK',
      })
    );
  }
);

const createCoreNotifyHandler = rest.post(
  `${API_ENDPOINT_CYBERFENCE_BASE_URL}/core/notify`,
  async (req, res, ctx) => {
    const data = await req.json();

    const notify = {
      ...testData.core.coreNotify.listTable[0],
      ...data,
      _id: uid(),
    };

    db.coreNotify.create(notify);

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: '',
        status: 'OK',
      })
    );
  }
);

export const updateCoreNotifyHandler = rest.put(
  `${API_ENDPOINT_CYBERFENCE_BASE_URL}/core/notify/:notifyId`,
  async (req, res, ctx) => {
    const notifyId = req.params.notifyId as string;
    const data = await req.json();

    const updatedNotify = db.coreNotify.update({
      where: {
        _id: {
          equals: notifyId,
        },
      },
      data: {
        ...data,
        _id: notifyId,
      },
    });

    if (!updatedNotify) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({ message: 'Can`t find notify!' })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '',
        status: 'OK',
      })
    );
  }
);

const deleteCoreNotifyHandler = rest.delete(
  `${API_ENDPOINT_CYBERFENCE_BASE_URL}/core/notify/:notifyId`,
  async (req, res, ctx) => {
    const notifyId = req.params.notifyId as string;

    const notify = db.coreNotify.delete({
      where: {
        _id: {
          equals: notifyId,
        },
      },
    });

    if (!notify) {
      return res(
        ctx.delay(300),
        ctx.status(404),
        ctx.json({ message: 'Not found!' })
      );
    }

    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        code: 200,
        message: '',
        status: 'OK',
      })
    );
  }
);

export const coreNotifyHandlers = [
  getCoreNotifyHandler,
  getCoreNotifyByIdHandler,
  deleteCoreNotifyHandler,
  createCoreNotifyHandler,
  updateCoreNotifyHandler,
];
