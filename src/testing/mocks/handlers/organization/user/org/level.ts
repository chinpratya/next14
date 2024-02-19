import { rest } from 'msw';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { uid } from '@/utils';

import { db } from '../../../../db';

const listOrganizationUserOrgLevelHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/level`,
  (req, res, ctx) => {
    const search = req.params.search as string;
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const levels = db.organizationUserOrgLevel.findMany(
      search
        ? {
            where: {
              label_en: {
                contains: search,
              },
              label_th: {
                contains: search,
              },
            },
            skip:
              (parseInt(page) - 1) * parseInt(pageSize),
            take: parseInt(pageSize),
            orderBy: {
              created_dt: 'desc',
            },
          }
        : {}
    );

    const processLevels = (parentId?: string) => {
      const lvs = levels.filter(
        (dep) =>
          dep.underId === parentId ||
          (!parentId && !dep.underId)
      );
      return lvs.map((lv) => {
        const child = processLevels(lv.levelId) as any;
        // if (child.length === 0) {
        //   return {
        //     ...lv,
        //   };
        // }
        return {
          ...lv,
          child,
        };
      });
    };
    //
    const processedLevels = processLevels();

    const totalRecord =
      db.organizationUserOrgLevel.count();
    const totalPage =
      totalRecord > parseInt(pageSize)
        ? Math.floor(totalRecord / parseInt(pageSize))
        : 1;

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: processedLevels?.[0],
        currentRecord: processedLevels.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const createOrganizationUserOrgLevelHandler = rest.post(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/level`,
  async (req, res, ctx) => {
    const body = await req.json();
    const underId = body.underId as string;

    if (!underId) {
      return res(
        ctx.status(400),
        ctx.delay(1000),
        ctx.json({
          code: 400,
          message: 'underId is required',
        })
      );
    }

    db.organizationUserOrgLevel.create({
      ...body,
      type: 'customize',
      levelId: uid(),
      created_dt: new Date().toISOString(),
      created_by: 'frontend developer',
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const getOrganizationUserOrgLevelHandler = rest.get(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/level/:levelId`,
  (req, res, ctx) => {
    const levelId = req.params.levelId as string;

    const level = db.organizationUserOrgLevel.findFirst({
      where: {
        levelId: {
          equals: levelId,
        },
      },
    });

    if (!level) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: level,
      })
    );
  }
);

const updateOrganizationUserOrgLevelHandler = rest.put(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/level/:levelId`,
  async (req, res, ctx) => {
    const levelId = req.params.levelId as string;
    const body = await req.json();

    const level = db.organizationUserOrgLevel.findFirst({
      where: {
        levelId: {
          equals: levelId,
        },
      },
    });

    if (!level) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    db.organizationUserOrgLevel.update({
      where: {
        levelId: {
          equals: levelId,
        },
      },
      data: {
        ...level,
        ...body,
        updated_dt: new Date().toISOString(),
        updated_by: 'frontend developer',
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

const deleteOrganizationUserOrgLevelHandler = rest.delete(
  `${API_ENDPOINT_ORGANIZATION_BASE_URL}/user/org/level/:levelId`,
  (req, res, ctx) => {
    const levelId = req.params.levelId as string;

    const level = db.organizationUserOrgLevel.findFirst({
      where: {
        levelId: {
          equals: levelId,
        },
      },
    });

    if (!level) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          code: 404,
          message: 'not found',
        })
      );
    }

    db.organizationUserOrgLevel.delete({
      where: {
        levelId: {
          equals: levelId,
        },
      },
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
      })
    );
  }
);

export const organizationUserOrgLevelHandlers = [
  listOrganizationUserOrgLevelHandler,
  createOrganizationUserOrgLevelHandler,
  getOrganizationUserOrgLevelHandler,
  updateOrganizationUserOrgLevelHandler,
  deleteOrganizationUserOrgLevelHandler,
];
