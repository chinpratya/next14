import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';

import { db } from '../../db';

const createDsarAutomationTagHandler = rest.post(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/tagdsar`,
  async (req, res, ctx) => {
    const { name, organization } = await req.json();

    if (!name || !organization) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'name and organization are required',
        })
      );
    }

    db.dsarAutomationTags.create({
      tagID: uuidv4(),
      name,
      organization,
      organizationID: uuidv4(),
      createdDt: new Date().toISOString(),
      updatedDt: '',
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

const deleteDsarAutomationTagHandler = rest.delete(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/tagdsar/:tagId`,
  (req, res, ctx) => {
    const tagId = req.params.tagId as string;

    if (!tagId) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'tagId is required',
        })
      );
    }

    db.dsarAutomationTags.delete({
      where: {
        tagID: {
          equals: tagId,
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
      })
    );
  }
);

const updateDsarAutomationTagHandler = rest.put(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/tagdsar/:tagId`,
  async (req, res, ctx) => {
    const tagId = req.params.tagId as string;
    const reqBody = await req.json();

    const tag = db.dsarAutomationTags.findFirst({
      where: {
        tagID: {
          equals: tagId,
        },
      },
    });

    if (!tagId) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'tagId is required',
        })
      );
    }

    db.dsarAutomationTags.update({
      where: {
        tagID: {
          equals: tagId,
        },
      },
      data: {
        ...tag,
        ...reqBody,
        updatedDt: new Date().toISOString(),
        updatedBy: 'admin',
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

const getDsarAutomationTagHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/tagdsar/:tagId`,
  (req, res, ctx) => {
    const tagId = req.params.tagId as string;

    if (!tagId) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          status: 400,
          statusCode: 400,
          message: 'tagId is required',
        })
      );
    }

    const data = db.dsarAutomationTags.findFirst({
      where: {
        tagID: {
          equals: tagId,
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
        data,
      })
    );
  }
);

const listDsarAutomationTagsHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/tagdsar`,
  (req, res, ctx) => {
    const page = req.url.searchParams?.get('page') ?? '1';
    const pageSize =
      req.url.searchParams.get('pageSize') ?? '10';
    const search =
      req.url.searchParams.get('search') ?? '';

    const data = db.dsarAutomationTags.findMany({
      take: parseInt(pageSize),
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      where: {
        name: {
          contains: search,
        },
      },
    });

    const totalRecord = db.dsarAutomationTags.count();
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

export const dsarAutomationTagsHandlers = [
  createDsarAutomationTagHandler,
  deleteDsarAutomationTagHandler,
  updateDsarAutomationTagHandler,
  getDsarAutomationTagHandler,
  listDsarAutomationTagsHandler,
];
