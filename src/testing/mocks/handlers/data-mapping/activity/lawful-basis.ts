import _ from 'lodash';
import { rest } from 'msw';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { db } from '@/testing/mocks/db';
import { testData } from '@/testing/test-data';

const getDataMappingActivityLawfulBasisHandler = rest.get(
  `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/lawful-basis`,
  (req, res, ctx) => {
    const activityId = req.params.activityId as string;

    const lawfulBasis =
      db.dataMappingActivityLawfulBasis.findFirst({
        where: {
          ObjectUUID: {
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
        data: lawfulBasis,
      })
    );
  }
);

const updateDataMappingActivityLawfulBasisHandler =
  rest.put(
    `${API_ENDPOINT_DATA_MAPPING_BASE_URL}/activity/:activityId/lawful-basis`,
    async (req, res, ctx) => {
      const activityId = req.params.activityId as string;
      const data = await req.json();

      const metaLegalBasis =
        testData.dataMapping.activity.meta.legalBasis;

      const metaRights =
        testData.dataMapping.activity.meta
          .rightsOfAccessData;

      const legalBasis = _.map(data.basisID, (value) =>
        _.find(
          metaLegalBasis,
          (v) => v.ObjectUUID === value
        )
      );

      const rights = _.map(
        data.rightsOfDataSubjectID,
        (value) =>
          _.find(
            metaRights,
            (v) => v.ObjectUUID === value
          )
      );

      const updatedData =
        db.dataMappingActivityLawfulBasis.update({
          where: {
            ObjectUUID: {
              equals: activityId,
            },
          },
          data: {
            ...data,
            basis: _.map(legalBasis, (value) => {
              return {
                basisID: value?.ObjectUUID ?? '',
                name: value?.name ?? '',
              };
            }),
            rightsOfDataSubjects: _.map(
              rights,
              (value) => {
                return {
                  rightsOfDataSubjectID:
                    value?.ObjectUUID ?? '',
                  name: value?.name ?? '',
                };
              }
            ),
          },
        });

      if (!updatedData) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          message: 'success',
          data: updatedData,
        })
      );
    }
  );

export const dataMappingActivityLawfulBasisHandlers = [
  getDataMappingActivityLawfulBasisHandler,
  updateDataMappingActivityLawfulBasisHandler,
];
