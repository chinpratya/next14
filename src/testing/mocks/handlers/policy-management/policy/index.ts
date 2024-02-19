import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';

import { policyManagementPolicyVersionHandlers } from './version';

const listPolicyManagementPolicyHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.policyManagementPolicy.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        ObjectUUID: {
          contains: search,
        },
      },
    });

    const totalRecord = db.policyManagementPolicy.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: data,
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const createPolicyManagementPolicyHandler = rest.post(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.policyManagementPolicy.create({
      ...data,
      ObjectUUID: uid(),
      status: 'draft',
      created_dt: new Date().toISOString(),
      created_by: 'Admin',
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

const getPolicyManagementPolicyHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId`,
  async (req, res, ctx) => {
    const policyId = req.params.policyId as string;

    const data = db.policyManagementPolicy.findFirst({
      where: {
        ObjectUUID: {
          equals: policyId,
        },
      },
    });

    if (!data) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'not found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data,
      })
    );
  }
);

const updatePolicyManagementPolicyHandler = rest.put(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId`,
  async (req, res, ctx) => {
    const policyId = req.params.policyId as string;
    const data = await req.json();

    const updatedData = db.policyManagementPolicy.update({
      where: {
        ObjectUUID: {
          equals: policyId,
        },
      },
      data: {
        ...data,
        updated_at: new Date().toISOString(),
        updated_by: 'Admin',
      },
    });

    if (!updatedData)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const deletePolicyManagementPolicyHandler = rest.delete(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId`,
  async (req, res, ctx) => {
    const policyId = req.params.policyId as string;

    const data = db.policyManagementPolicy.delete({
      where: {
        ObjectUUID: {
          equals: policyId,
        },
      },
    });

    if (!data)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const publishPolicyManagementPolicyHandler = rest.post(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId/publish`,
  (req, res, ctx) => {
    const policyId = req.params.policyId as string;

    db.policyManagementPolicy.update({
      where: {
        ObjectUUID: {
          equals: policyId,
        },
      },
      data: {
        status: 'publish',
        updated_at: new Date().toISOString(),
        updated_by: 'Admin',
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(3000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const getPolicyManagementPolicyPreviewHandler = rest.get(
  `${API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL}/policyNotices/:policyId/preview`,
  async (req, res, ctx) => {
    const policyId = req.params.policyId as string;

    const data = db.policyManagementPolicy.findFirst({
      where: {
        ObjectUUID: {
          equals: policyId,
        },
      },
    });

    if (!data) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'not found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        statusCode: 200,
        message: 'success',
        data,
      })
    );
  }
);

export const policyManagementPolicyHandlers = [
  ...policyManagementPolicyVersionHandlers,
  listPolicyManagementPolicyHandler,
  createPolicyManagementPolicyHandler,
  getPolicyManagementPolicyHandler,
  updatePolicyManagementPolicyHandler,
  deletePolicyManagementPolicyHandler,
  publishPolicyManagementPolicyHandler,
  getPolicyManagementPolicyPreviewHandler,
];
