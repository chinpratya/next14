import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { uid } from '@/utils';

import { db } from '../../db';

const createDataMappingAssetHandler = rest.post(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.dataMappingAsset.create({
      ...data,
      assetID: uid(),
      created_dt: new Date().toISOString(),
      created_by: 'admin',
      updated_dt: new Date().toISOString(),
      updated_by: 'admin',
      country: 'New Country',
      group: 'Webapp',
      owner: 'CR7',
      organization: data.organizationName ?? '',
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

const listDataMappingAssetHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const data = db.dataMappingAsset.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord = db.dataMappingAsset.count();
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

const getDataMappingAssetHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset/:assetId`,
  (req, res, ctx) => {
    const assetId = req.params.assetId as string;

    const asset = db.dataMappingAsset.findFirst({
      where: {
        assetID: {
          equals: assetId,
        },
      },
    });

    if (!asset) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Can`t find asset!',
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          ...asset,
          groupID: '213123',
          countryID:
            '2d6d4006-520d-48f3-855c-01545aa37cd9',
          description: 'Description',
        },
      })
    );
  }
);

const deleteDataMappingAssetHandler = rest.delete(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset/:assetId`,
  async (req, res, ctx) => {
    const assetId = req.params.assetId as string;

    const data = db.dataMappingAsset.delete({
      where: {
        assetID: {
          equals: assetId,
        },
      },
    });

    if (!data)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

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

const updateDataMappingAssetHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset/:assetId`,
  async (req, res, ctx) => {
    const assetId = req.params.assetId as string;

    const data = await req.json();
    const organization =
      db.organizationUserOrgDepartment.findFirst({
        where: {
          departmentId: {
            equals: data.organizationID,
          },
        },
      });

    const updatedData = db.dataMappingAsset.update({
      where: {
        assetID: {
          equals: assetId,
        },
      },
      data: {
        ...data,
        organization: organization?.department_name,
      },
    });

    if (!updatedData)
      return res(
        ctx.status(404),
        ctx.delay(3000),
        ctx.json({
          code: 404,
          message: 'Not Found',
        })
      );

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

const createDataMappingAssetResponsibleHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset/:assetId/responsible`,
    async (req, res, ctx) => {
      const data = await req.json();
      const assetId = req.params.assetId as string;

      const listResponsible = data.responsibleID;
      for (const responsible of listResponsible) {
        db.dataMappingAssetResponsible.create({
          ...data,
          responsibleID: responsible,
          name: 'Test',
          email: `${responsible}@gmail.com`,
          organizationID: '123444',
          organizationName: 'sp',
          assetID: assetId,
          created_dt: new Date().toISOString(),
          created_by: 'admin',
          updated_dt: new Date().toISOString(),
          updated_by: 'admin',
        });
      }

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

const listDataMappingAssetResponsibleHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset/:assetId/responsible`,
  (req, res, ctx) => {
    const assetId = req.params.assetId as string;
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const data = db.dataMappingAssetResponsible.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      where: {
        assetID: {
          equals: assetId,
        },
      },
      orderBy: {
        created_dt: 'desc',
      },
    });

    const totalRecord =
      db.dataMappingAssetResponsible.count();
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

const deleteDataMappingAssetResponsibleHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/asset/:assetId/responsible/:responsibleId`,
    async (req, res, ctx) => {
      const responsibleId = req.params
        .responsibleId as string;

      const data = db.dataMappingAssetResponsible.delete({
        where: {
          responsibleID: {
            equals: responsibleId,
          },
        },
      });

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

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

export const dataMappingAssetHandlers = [
  createDataMappingAssetHandler,
  listDataMappingAssetHandler,
  deleteDataMappingAssetHandler,
  updateDataMappingAssetHandler,
  createDataMappingAssetResponsibleHandler,
  listDataMappingAssetResponsibleHandler,
  getDataMappingAssetHandler,
  deleteDataMappingAssetResponsibleHandler,
];
