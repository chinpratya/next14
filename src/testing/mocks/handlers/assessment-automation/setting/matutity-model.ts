import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const listComplianceSettingMaturityModelHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/matutity-model`,
    async (req, res, ctx) => {
      const search =
        req.url.searchParams.get('search') || '';
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceSettingMaturityModel.findMany({
          where: {
            name: {
              contains: search,
            },
          },
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          orderBy: {
            createdDt: 'desc',
          },
        });

      const totalRecord =
        db.complianceSettingMaturityModel.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const createComplianceSettingMaturityModelHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/matutity-model`,
    async (req, res, ctx) => {
      const data = await req.json();

      const modelType = db.optionType.findFirst({
        where: {
          ObjectUUID: {
            equals: data.modelType,
          },
        },
      });

      db.complianceSettingMaturityModel.create({
        ...data,
        modelType: modelType?.name,
        numberOfWebformAvailable: 0,
        createdDt: new Date().toISOString(),
        createdBy: 'Admin',
        updatedDt: '',
        updatedBy: '',
        ObjectUUID: uuid(),
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

const getComplianceSettingMaturityModelHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/matutity-model/:maturityModelId`,
  async (req, res, ctx) => {
    const maturityModelId = req.params
      .maturityModelId as string;

    const data =
      db.complianceSettingMaturityModel.findFirst({
        where: {
          ObjectUUID: {
            equals: maturityModelId,
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
        data,
      })
    );
  }
);

const updateComplianceSettingMaturityModelHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/matutity-model/:maturityModelId`,
    async (req, res, ctx) => {
      const maturityModelId = req.params
        .maturityModelId as string;

      const { detail } = await req.json();

      const maturityModel =
        db.complianceSettingMaturityModel.findFirst({
          where: {
            ObjectUUID: {
              equals: maturityModelId,
            },
          },
        });

      if (!maturityModel)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      const detailData = detail.map((item: any) =>
        db.complianceSettingMaturityDetailModel.create({
          ...item,
          ObjectUUID: uuid(),
        })
      );

      db.complianceSettingMaturityModel.update({
        where: {
          ObjectUUID: {
            equals: maturityModelId,
          },
        },
        data: {
          ...maturityModel,
          detail: detailData,
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

const deleteComplianceSettingMaturityModelHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/matutity-model/:maturityModelId`,
    async (req, res, ctx) => {
      const maturityModelId = req.params
        .maturityModelId as string;

      const data =
        db.complianceSettingMaturityModel.delete({
          where: {
            ObjectUUID: {
              equals: maturityModelId,
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

export const complianceSettingMaturityModelHandlers = [
  listComplianceSettingMaturityModelHandler,
  createComplianceSettingMaturityModelHandler,
  updateComplianceSettingMaturityModelHandler,
  getComplianceSettingMaturityModelHandler,
  deleteComplianceSettingMaturityModelHandler,
];
