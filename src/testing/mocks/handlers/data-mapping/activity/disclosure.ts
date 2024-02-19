import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';
import { db } from '../../../db';

const getDataMappingActivityDisclosureHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    const activity = db.dataMappingActivity.findFirst({
      where: {
        ObjectUUID: {
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
        data: {
          isDisclosure: activity.isDisclosure ?? false,
        },
      })
    );
  }
);

const updateDataMappingActivityDisclosureHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const body = await req.json();

      const activity = db.dataMappingActivity.findFirst({
        where: {
          ObjectUUID: {
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

      await db.dataMappingActivity.update({
        where: {
          ObjectUUID: {
            equals: activityId,
          },
        },
        data: {
          isDisclosure: body.isDisclosure,
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

const listDataMappingActivityDisclosureActorHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/actor`,
    (req, res, ctx) => {
      const activityId = req.params.activityId as string;

      const activity = db.dataMappingActivity.findFirst({
        where: {
          ObjectUUID: {
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

      const actors =
        db.dataMappingActivityDisclosureActor.findMany({
          where: {
            activityId: {
              equals: activityId,
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
          data: actors?.map((actor) => ({
            ...actor,
            id: undefined,
            activityId: undefined,
          })),
        })
      );
    }
  );

const addDataMappingActivityDisclosureActorHandler =
  rest.post(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/actor`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const body = await req.json();
      const actorId = body.actorID as string;

      const activity = db.dataMappingActivity.findFirst({
        where: {
          ObjectUUID: {
            equals: activityId,
          },
        },
      });

      const actor = db.dataMappingActivityActor.findFirst(
        {
          where: {
            activityId: {
              equals: activityId,
            },
            ObjectUUID: {
              equals: actorId,
            },
          },
        }
      );

      if (!activity || !actor) {
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

      db.dataMappingActivityDisclosureActor.create({
        id: uuid(),
        actorID: actor.ObjectUUID,
        activityId: activityId,
        name: actor.name,
        personalType: actor.type,
        actorType: actor.actorType,
        country: 'ไทย',
        organization: actor.organization,
        organizationType: actor.organizationType,
        purposeID: '',
        purpose: '',
      });

      return res(
        ctx.status(201),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const updateDataMappingActivityDisclosureActorHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/actor/:actorId`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const actorId = req.params.actorId as string;
      const body = await req.json();

      const purposeId = body.purposeID as string;

      if (!purposeId) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'purposeID is required',
          })
        );
      }

      const purpose = db.dataMappingPurpose.findFirst({
        where: {
          purposeID: {
            equals: purposeId,
          },
        },
      });

      if (!purpose) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'purposeID is invalid',
          })
        );
      }

      const updatedDisclosureActor =
        db.dataMappingActivityDisclosureActor.update({
          where: {
            activityId: {
              equals: activityId,
            },
            actorID: {
              equals: actorId,
            },
          },
          data: {
            purposeID: purpose.purposeID,
            purpose: purpose.name,
          },
        });

      if (!updatedDisclosureActor) {
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

const removeDataMappingActivityDisclosureActorHandler =
  rest.delete(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/actor/:actorId`,
    (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const actorId = req.params.actorId as string;

      db.dataMappingActivityDisclosureActor.delete({
        where: {
          activityId: {
            equals: activityId,
          },
          actorID: {
            equals: actorId,
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

const listDataMappingActivityDisclosurePurposeHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/purpose`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: testData.dataMapping.activity.disclosure
            .purpose.list,
        })
      );
    }
  );

const listDataMappingActivityDisclosurePurposeDestinationHandler =
  rest.get(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/purpose/:purposeId/destination`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
          data: testData?.dataMapping.activity.disclosure
            .purpose.destination,
        })
      );
    }
  );

const updateDataMappingActivityDisclosurePurposeDestinationHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/disclosure/purpose/:purposeId/destination/:destinationId`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const purposeId = req.params.purposeId as string;
      const destinationId = req.params
        .destinationId as string;

      const body = await req.json();

      console.log({
        activityId,
        purposeId,
        destinationId,
        body,
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

export const dataMappingActivityDisclosureHandlers = [
  getDataMappingActivityDisclosureHandler,
  updateDataMappingActivityDisclosureHandler,
  listDataMappingActivityDisclosureActorHandler,
  addDataMappingActivityDisclosureActorHandler,
  updateDataMappingActivityDisclosureActorHandler,
  removeDataMappingActivityDisclosureActorHandler,
  listDataMappingActivityDisclosurePurposeHandler,
  listDataMappingActivityDisclosurePurposeDestinationHandler,
  updateDataMappingActivityDisclosurePurposeDestinationHandler,
];
