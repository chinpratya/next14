import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { db } from '../../../db';

const getDataMappingActivityUsageHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    const activity =
      db.dataMappingActivityUsage.findFirst({
        where: {
          ID: {
            equals: activityId,
          },
        },
      });

    if (!activity) {
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
        status: 200,
        statusCode: 200,
        message: 'success',
        data: activity,
      })
    );
  }
);
const updateDataMappingActivityUsageHandler = rest.put(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage`,
  async (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    const body = await req.json();

    const data = db.dataMappingActivityUsage.update({
      where: {
        ID: {
          equals: activityId,
        },
      },
      data: {
        ...body,
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
        status: 200,
        statusCode: 200,
        message: 'success',
      })
    );
  }
);

const listDataMappingActivityUsagePurposeHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage/purpose`,
    (req, res, ctx) => {
      const activity =
        db.dataMappingActivityUsagePurpose.getAll();

      if (!activity) {
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
          status: 200,
          statusCode: 200,
          message: 'success',
          data: activity,
        })
      );
    }
  );

const deleteDataMappingActivityUsagePurposeHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityID/usage/purpose/:purposeID`,
    async (req, res, ctx) => {
      const purposeId = req.params.purposeID as string;

      const data =
        db.dataMappingActivityUsagePurpose.delete({
          where: {
            purposeID: {
              equals: purposeId,
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

const addDataMappingActivityUsagePurposeHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage/purpose`,
    async (req, res, ctx) => {
      const body = await req.json();
      const purposeID = body?.purposeID as string[];

      const data = purposeID.map((purposeId) => {
        return db.dataMappingPurpose.findFirst({
          where: {
            purposeID: {
              equals: purposeId,
            },
          },
        });
      });

      if (data.find((item) => !item)) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'error',
          })
        );
      }

      data.forEach((item) => {
        db.dataMappingActivityUsagePurpose.create({
          purposeID: item?.purposeID,
          name: item?.name,
          legalBasis: item?.legalBasis ?? [],
          group: item?.group,
          organization: item?.organization,
        });
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

const listDataMappingActivityUsagePeopleHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage/people`,
    (req, res, ctx) => {
      const activity =
        db.dataMappingActivityUsagePeople.getAll();

      if (!activity) {
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
          status: 200,
          statusCode: 200,
          message: 'success',
          data: activity,
        })
      );
    }
  );

const deleteDataMappingActivityUsagePeopleHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage/people/:peopleId`,
    async (req, res, ctx) => {
      const peopleId = req.params.peopleId as string;

      const data =
        db.dataMappingActivityUsagePeople.delete({
          where: {
            peopleID: {
              equals: peopleId,
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

const addDataMappingActivityUsagePeopleHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage/people`,
    async (req, res, ctx) => {
      const body = await req.json();
      const peopleID = body?.peopleID as string[];

      const data = peopleID.map((userId) => {
        return db.organizationUserOrgUsers.findFirst({
          where: {
            userId: {
              equals: userId,
            },
          },
        });
      });

      if (data.find((item) => !item)) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'error',
          })
        );
      }

      data.forEach((item) => {
        db.dataMappingActivityUsagePeople.create({
          peopleID: item?.userId,
          name: item?.first_name,
          description: 'test',
          organization: 'SP',
        });
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

const updateDataMappingActivityUsagePeopleHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/usage/people/:peopleId`,
    async (req, res, ctx) => {
      const peopleID = req.params.peopleId as string;

      const body = await req.json();

      const people =
        db.dataMappingActivityUsagePeople.findFirst({
          where: {
            peopleID: {
              equals: peopleID,
            },
          },
        });
      const data =
        db.dataMappingActivityUsagePeople.update({
          where: {
            peopleID: {
              equals: peopleID,
            },
          },
          data: {
            ...people,
            description: body.description,
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
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

export const dataMappingActivityUsageHandlers = [
  getDataMappingActivityUsageHandler,
  listDataMappingActivityUsagePurposeHandler,
  deleteDataMappingActivityUsagePurposeHandler,
  addDataMappingActivityUsagePurposeHandler,
  listDataMappingActivityUsagePeopleHandler,
  deleteDataMappingActivityUsagePeopleHandler,
  addDataMappingActivityUsagePeopleHandler,
  updateDataMappingActivityUsagePeopleHandler,
  updateDataMappingActivityUsageHandler,
];
