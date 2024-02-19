import dayjs from 'dayjs';
import _ from 'lodash';
import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { testData } from '@/testing/test-data';
import { uid } from '@/utils';

import { db } from '../../db';

const listComplianceAssessmentHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment`,
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const pageSize =
      req.url.searchParams.get('pageSize') || '10';

    const data = db.complianceAssessmentModel.findMany({
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      // orderBy: {
      //   createdDt: 'desc',
      // },
    });

    const totalRecord =
      db.complianceAssessmentModel.count();
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
        data: data,
        currentRecord: data.length,
        totalRecord,
        currentPage: parseInt(page),
        totalPage,
      })
    );
  }
);

const getComplianceAssessmentHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId`,
  (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const data = db.complianceAssessmentModel.findFirst({
      where: {
        ObjectUUID: {
          equals: assessmentId,
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
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

const getComplianceAssessmentFormHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/form`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: {
          form: testData.compliance.assessment.form,
        },
      })
    );
  }
);

const updateComplianceAssessmentFormHandler = rest.put(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/form`,
  (req, res, ctx) => {
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

const getComplianceAssessmentScoreHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/score`,
  (req, res, ctx) => {
    const data = {
      score: [],
    };

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
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

const updateComplianceAssessmentScoreHandler = rest.put(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/score`,
  (req, res, ctx) => {
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

const getComplianceAssessmentLogicHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/logic`,
  (req, res, ctx) => {
    const data = {
      logics: [],
    };

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
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        data: data,
      })
    );
  }
);

const updateComplianceAssessmentLogicHandler = rest.put(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/logic`,
  (req, res, ctx) => {
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

const createComplianceAssessmentHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment`,
  async (req, res, ctx) => {
    const data = await req.json();

    db.complianceAssessmentModel.create({
      ...data,
      ObjectUUID: uid(),
      createdDt: new Date().toISOString(),
      createdBy: 'admin',
      version: 'draft',
      status: 'draft',
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

const duplicateComplianceAssessmentHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/clone`,
  async (req, res, ctx) => {
    const data = await req.json();
    const ObjectUID = uid();

    db.complianceAssessmentModel.create({
      ObjectUUID: ObjectUID,
      name: data.basicInfo.name,
      description: data.basicInfo.description,
      createdDt: dayjs().format('DD MMM YYYY HH:mm'),
      createdBy: 'admin',
      updatedDt: '2023-03-23 10:00',
      updatedBy: 'admin',
      version: 1,
      status: 'draft',
    });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 200,
        message: 'success',
        ObjectUUID: ObjectUID,
      })
    );
  }
);

const publishComplianceAssessmentHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/publish`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const assessment =
      db.complianceAssessmentModel.findFirst({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
      });

    const updatedData =
      db.complianceAssessmentModel.update({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
        data: {
          ...assessment,
          status: 'publish',
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
        data: updatedData,
      })
    );
  }
);

const updateComplianceAssessmentHandler = rest.put(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const data = await req.json();

    const updatedData =
      db.complianceAssessmentModel.update({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
        data: {
          ...data,
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
        data: updatedData,
      })
    );
  }
);

const deleteComplianceAssessmentHandler = rest.delete(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:inventoryId`,
  async (req, res, ctx) => {
    const inventoryId = req.params.inventoryId as string;

    const data = db.complianceAssessmentModel.delete({
      where: {
        ObjectUUID: {
          equals: inventoryId,
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

const addFileComplianceAssessmentHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/file`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const assessment =
      db.complianceAssessmentModel.findFirst({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
      });
    if (assessment) {
      const updatedData =
        db.complianceAssessmentModel.update({
          where: {
            ObjectUUID: {
              equals: assessmentId,
            },
          },
          data: {
            ...assessment,
            // files: [...assessment.files, file],
          },
        });
      if (!updatedData) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );
      }
      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
          data: updatedData,
        })
      );
    }
  }
);

const deleteFileComplianceAssessmentHandler = rest.delete(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/:assessmentId/file/:fileID`,
  async (req, res, ctx) => {
    const assessmentId = req.params
      .assessmentId as string;

    const assessment =
      db.complianceAssessmentModel.findFirst({
        where: {
          ObjectUUID: {
            equals: assessmentId,
          },
        },
      });

    if (assessment) {
      const updatedData =
        db.complianceAssessmentModel.update({
          where: {
            ObjectUUID: {
              equals: assessmentId,
            },
          },
          data: {
            ...assessment,
            // files: fileNew,
          },
        });
      if (!updatedData) {
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  }
);

const importExcelComplianceAssessmentHandler = rest.post(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/assessment/excel`,
  async (req, res, ctx) => {
    const data = await req.json();

    _.map(data, (value) => {
      db.complianceAssessmentModel.create({
        ObjectUUID: uid(),
        name: value.name,
        description: value.description,
        createdDt: dayjs().format('DD MMM YYYY HH:mm'),
        createdBy: 'admin',
        updatedDt: '2023-03-23 10:00',
        updatedBy: 'admin',
        version: 1,
        status: 'draft',
      });
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

export const complianceAssessmentHandlers = [
  listComplianceAssessmentHandler,
  getComplianceAssessmentFormHandler,
  updateComplianceAssessmentFormHandler,
  getComplianceAssessmentScoreHandler,
  updateComplianceAssessmentScoreHandler,
  getComplianceAssessmentLogicHandler,
  updateComplianceAssessmentLogicHandler,
  getComplianceAssessmentHandler,
  createComplianceAssessmentHandler,
  duplicateComplianceAssessmentHandler,
  publishComplianceAssessmentHandler,
  updateComplianceAssessmentHandler,
  deleteComplianceAssessmentHandler,
  addFileComplianceAssessmentHandler,
  deleteFileComplianceAssessmentHandler,
  importExcelComplianceAssessmentHandler,
];
